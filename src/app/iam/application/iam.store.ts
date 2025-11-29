import {computed, Injectable, Signal, signal} from '@angular/core';
import {User} from '../domain/model/user.entity';
import {Observable, retry} from 'rxjs';
import {Account} from '../domain/model/account.entity';
import {IamApi} from '../infrastructure/services/iam-api';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {SignInCommand} from '../domain/model/sign-in.command';
import {Router} from '@angular/router';
import {SignUpCommand} from '../domain/model/sign-up.command';


@Injectable({ providedIn: 'root' })
export class IamStore {
  private readonly usersSignal = signal<User[]>([]);
  readonly users = this.usersSignal.asReadonly();

  private readonly accountsSignal = signal<Account[]>([]);
  readonly accounts = this.accountsSignal.asReadonly();

  readonly userCount = computed(() => this.users().length);
  readonly accountCount = computed(() => this.accounts().length);

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  private _currentAccount: Account | undefined = undefined;


  private readonly isSignedInSignal = signal<boolean>(false);
  readonly isSignedIn = this.isSignedInSignal.asReadonly();

  private readonly currentEmailSignal = signal<string | null>(null);
  readonly currentEmail = this.currentEmailSignal.asReadonly();

  private readonly currentAccountIdSignal = signal<number | null>(null);
  readonly currentUserId = this.currentAccountIdSignal.asReadonly();

  readonly loadingUsers = signal<boolean>(false);

  readonly currentToken = computed(() => this.isSignedIn() ? localStorage.getItem('token') : null);

  readonly isLoadingUsers = this.loadingUsers.asReadonly();





  constructor(private iamApi: IamApi) {
    this.loadUsers();
    this.loadAccounts();

    this.isSignedInSignal.set(false);
    this.currentEmailSignal.set(null);
    this.currentAccountIdSignal.set(null);
  }

  get currentAccount(): Account | undefined {
    return this._currentAccount;
  }
  set currentAccount(value: Account){
    this._currentAccount = value;
  }

  private loadUsers(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.iamApi.getUsers().pipe(takeUntilDestroyed()).subscribe({
      next: users => {
        console.log(users);
        this.usersSignal.set(users);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load users'));
        this.loadingSignal.set(false);
      }
    });
  }

  private loadAccounts(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.iamApi.getAccounts().pipe(takeUntilDestroyed()).subscribe({
      next: accounts => {
        console.log(accounts);
        this.accountsSignal.set(accounts);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load accounts'));
        this.loadingSignal.set(false);
      }
    });
  }

  private formatError(error: any, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('Resource not found') ? '${fallback}: Not found' : error.message;
    }
    return fallback;
  }

  getUserById(id: number): Signal<User | undefined>{
    return computed(() => id? this.users().find(u => u.id === id): undefined);
  }

  addUser(user: User): void {
     this.loadingSignal.set(true);
     this.errorSignal.set(null);
     this.iamApi.createUser(user).pipe(retry(2)).subscribe({
       next: createdUser => {
         this.usersSignal.update(users => [...users, createdUser]);
         this.loadingSignal.set(false);
       },
       error: err => {
         this.errorSignal.set(this.formatError(err, 'Failed to create user'));
         this.loadingSignal.set(false);
       }
     });
  }

  updateUser(updatedUser: User): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.iamApi.updateUser(updatedUser).pipe(retry(2)).subscribe({
      next: user => {
        this.usersSignal.update(users => users.map(u => u.id === user.id ? user : u));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to update user'));
        this.loadingSignal.set(false);
      }
    });
  }

  deleteUser(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.iamApi.deleteUser(id).pipe(retry(2)).subscribe({
      next: () => {
        this.usersSignal.update(users => users.filter((u => u.id !== id)));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to delete user'));
        this.loadingSignal.set(false);
      }
    });
  }



  getAccountById(id: number): Signal<Account | undefined>{
    return computed(() => id? this.accounts().find(a => a.id === id): undefined);
  }

  addAccount(account: Account): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.iamApi.createAccount(account).pipe(retry(2)).subscribe({
      next: createdAccount => {
        this.accountsSignal.update(accounts => [...accounts, createdAccount]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create account'));
        this.loadingSignal.set(false);
      }
    });
  }

  updateAccount(updatedAccount: Account): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.iamApi.updateAccount(updatedAccount).pipe(retry(2)).subscribe({
      next: account => {
        this.accountsSignal.update(accounts => accounts.map(a => a.id === account.id ? account : a));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to update account'));
        this.loadingSignal.set(false);
      }
    });
  }

  deleteAccount(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.iamApi.deleteAccount(id).pipe(retry(2)).subscribe({
      next: () => {
        this.accountsSignal.update(accounts => accounts.filter((a => a.id !== id)));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to delete account'));
        this.loadingSignal.set(false);
      }
    });
  }


  /**
   * Signs in a user with the provided credentials.
   * @param signInCommand The sign-in command.
   * @param router The router for navigation.
   */
  signIn(signInCommand: SignInCommand, router: Router) {
    console.log(signInCommand);
    this.iamApi.signIn(signInCommand).subscribe({
      next: (signInResource) => {
        localStorage.setItem('token', signInResource.token);
        this.isSignedInSignal.set(true);
        this.currentEmailSignal.set(signInResource.email);
        this.currentAccountIdSignal.set(signInResource.id);
        router.navigate(['/home']).then();
      },
      error: (err) => {
        console.error('Sign-in failed:', err);
        this.isSignedInSignal.set(false);
        this.currentEmailSignal.set(null);
        this.currentAccountIdSignal.set(null);
        router.navigate(['/iam/sign-in']).then();
      }
    });
  }

  /**
   * Signs up a new user.
   * @param signUpCommand The sign-up command.
   * @param router The router for navigation.
   */
  signUp(signUpCommand: SignUpCommand, router: Router) {
    this.iamApi.signUp(signUpCommand).subscribe({
      next: (signUpResource) => {
        console.log('Sign-up successful:', signUpResource);
        router.navigate(['/iam/sign-in']).then();
      },
      error: (err) => {
        console.error('Sign-up failed:', err);
        this.isSignedInSignal.set(false);
        this.currentEmailSignal.set(null);
        this.currentAccountIdSignal.set(null);
        router.navigate(['/iam/sign-up']).then();
      }
    });
  }

  /**
   * Signs out the current user.
   * @param router The router for navigation.
   */
  signOut(router: Router) {
    localStorage.removeItem('token');
    this.isSignedInSignal.set(false);
    this.currentEmailSignal.set(null);
    this.currentAccountIdSignal.set(null);
    router.navigate(['/iam/sign-in']).then();
  }


}
