import {UserResource} from './user-resource';
import {AccountType} from '../../domain/model/account-type';

export interface AccountResource {
  id: number;
  user: UserResource;
  email: string;
  password: string;
  isActive: boolean;
  role: AccountType
}
