import {BaseEntity} from '../../../shared/domain/model/base-entity';
import {User} from './user.entity';
import {AccountType} from './account-type';

export class Account implements BaseEntity {
  private readonly _id: number;
  private _user: User;
  private _email: string;
  private _password: string;
  private _isActive: boolean;
  private _role: AccountType

  constructor(account:{
    id:number,
    user:User,
    email:string,
    password:string,
    isActive:boolean,
    role:AccountType
  }) {
    this._id = account.id;
    this._user = account.user;
    this._email = account.email;
    this._password = account.password;
    this._isActive = account.isActive;
    this._role = account.role;
  }

  get id(){return this._id;}
  get user(){return this._user;}
  get email(){return this._email;}
  get password(){return this._password;}
  get isActive(){return this._isActive;}
  get role(){return this._role;}

  set user(user:User){this._user = user;}
  set email(email:string){this._email = email;}
  set password(email:string){this._password = email;}
  set isActive(isActive:boolean){this._isActive = isActive;}
  set role(role:AccountType){this._role = role;}
}
