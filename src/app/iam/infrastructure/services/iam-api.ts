import {BaseApi} from '../../../shared/infrastructure/base-api';
import {Injectable} from '@angular/core';
import {UsersApiEndpoint} from './users-api-endpoint';
import {AccountsApiEndpoint} from './accounts-api-endpoint';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../domain/model/user.entity';
import {Account} from '../../domain/model/account.entity';

@Injectable({providedIn: 'root'})
export class IamApi extends BaseApi {
  private readonly usersEndpoint: UsersApiEndpoint;
  private readonly accountsEndpoint: AccountsApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.usersEndpoint = new UsersApiEndpoint(http);
    this.accountsEndpoint = new AccountsApiEndpoint(http);
  }

  getUsers(): Observable<User[]>{
    return this.usersEndpoint.getAll();
  }
  getUser(id: number){
    return this.usersEndpoint.getById(id);
  }
  createUser(user: User): Observable<User>{
    return this.usersEndpoint.create(user);
  }
  updateUser(user: User): Observable<User>{
    return this.usersEndpoint.update(user, user.id);
  }
  deleteUser(id: number): Observable<void>{
    return this.usersEndpoint.delete(id);
  }

  getAccounts(): Observable<Account[]>{
    return this.accountsEndpoint.getAll();
  }
  getAccount(id: number): Observable<Account>{
    return this.accountsEndpoint.getById(id);
  }
  createAccount(account: Account): Observable<Account>{
    return this.accountsEndpoint.create(account);
  }
  updateAccount(account: Account): Observable<Account>{
    return this.accountsEndpoint.update(account, account.id);
  }
  deleteAccount(id: number): Observable<void>{
    return this.accountsEndpoint.delete(id);
  }
}
