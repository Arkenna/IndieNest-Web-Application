import {computed, Injectable, Signal, signal} from '@angular/core';
import {User} from '../domain/model/user.entity';
import {retry, take} from 'rxjs';
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

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();


  public readonly currentAccountIdSignal = signal<number | null>(
    localStorage.getItem('accountId') ? Number(localStorage.getItem('accountId')) : null
  );
  readonly currentUserId = this.currentAccountIdSignal.asReadonly();

  private readonly isSignedInSignal = signal<boolean>(!!localStorage.getItem('token'));
  readonly isSignedIn = this.isSignedInSignal.asReadonly();

  private readonly currentEmailSignal = signal<string | null>(localStorage.getItem('email'));
  readonly currentEmail = this.currentEmailSignal.asReadonly();

  readonly userCount = computed(() => this.users().length);
  readonly accountCount = computed(() => this.accounts().length);
  readonly loadingUsers = signal<boolean>(false);
  readonly currentToken = computed(() => this.isSignedIn() ? localStorage.getItem('token') : null);
  readonly isLoadingUsers = this.loadingUsers.asReadonly();

  constructor(private iamApi: IamApi) {
    this.loadUsers();
    this.loadAccounts();
    if (this.currentAccountIdSignal()) {
      this.loadAccountById(this.currentAccountIdSignal()!);
    }
  }


  get currentAccount(): Account | undefined {
    return this.accounts().find(account => account.id === this.currentAccountIdSignal());
  }

  private loadAccountById(id: number): void {
    this.iamApi.getAccount(id).pipe(take(1)).subscribe({
      next: account => {
        this.accountsSignal.update(currentAccounts => {
          const index = currentAccounts.findIndex(a => a.id === account.id);
          if (index !== -1) {
            const updated = [...currentAccounts];
            updated[index] = account;
            return updated;
          }
          return [...currentAccounts, account];
        });
      },
      error: err => console.error('Error loading account', err)
    });
  }
  private loadUsers(): void {
    this.loadingSignal.set(true);
    this.iamApi.getUsers().pipe(takeUntilDestroyed()).subscribe({
      next: users => { this.usersSignal.set(users); this.loadingSignal.set(false); },
      error: () => this.loadingSignal.set(false)
    });
  }

  private loadAccounts(): void {
    this.loadingSignal.set(true);
    this.iamApi.getAccounts().pipe(takeUntilDestroyed()).subscribe({
      next: accounts => { this.accountsSignal.set(accounts); this.loadingSignal.set(false); },
      error: () => this.loadingSignal.set(false)
    });
  }

  private formatError(error: any, fallback: string): string {
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
  signIn(signInCommand: SignInCommand, router: Router) {
    this.iamApi.signIn(signInCommand).subscribe({
      next: (signInResource) => {
        localStorage.setItem('token', signInResource.token);
        localStorage.setItem('accountId', signInResource.id.toString());
        localStorage.setItem('email', signInResource.email);

        this.isSignedInSignal.set(true);
        this.currentEmailSignal.set(signInResource.email);
        this.currentAccountIdSignal.set(signInResource.id);

        this.loadAccountById(signInResource.id);
        this.loadUsers();

        router.navigate(['/']).then();
      },
      error: (err) => {
        console.error('Sign-in failed:', err);
        this.signOut(router);
      }
    });
  }

  signUp(signUpCommand: SignUpCommand, router: Router) {
    this.iamApi.signUp(signUpCommand).subscribe({
      next: () => {
        router.navigate(['/log-in']).then();
      },
      error: (err) => console.error(err)
    });
  }

  signOut(router: Router) {
    localStorage.removeItem('token');
    localStorage.removeItem('accountId');
    localStorage.removeItem('email');

    this.isSignedInSignal.set(false);
    this.currentEmailSignal.set(null);
    this.currentAccountIdSignal.set(null);

    router.navigate(['/log-in']).then();
  }
}
