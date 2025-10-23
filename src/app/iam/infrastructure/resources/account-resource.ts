import {AccountType} from '../../domain/model/account-type';
import {BaseResource} from '../../../shared/infrastructure/base-resource';

export interface AccountResource extends BaseResource {
  id: number;
  userId: number;
  email: string;
  isActive: boolean;
  password: string;
  role: AccountType
}
