import {UserResource} from './user-resource';
import {AccountType} from '../../domain/model/account-type';
import {BaseResource} from '../../../shared/infrastructure/base-resource';

export interface AccountResource extends BaseResource {
  id: number;
  user: UserResource;
  email: string;
  password: string;
  isActive: boolean;
  role: AccountType
}
