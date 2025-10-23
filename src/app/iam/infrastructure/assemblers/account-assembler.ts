import {BaseAssembler} from '../../../shared/infrastructure/base-assembler';
import {AccountResource} from '../resources/account-resource';
import {AccountsResponse} from '../responses/accounts-response';
import {Account} from '../../domain/model/account.entity';
import {UserAssembler} from './user-assembler';

export class AccountAssembler implements BaseAssembler<Account, AccountResource, AccountsResponse> {

  constructor(private userAssembler = new UserAssembler()) {}

  toEntityFromResource(resource: AccountResource){
    return new Account({
      id: resource.id,
      userId: resource.userId,
      email: resource.email,
      password: resource.password,
      isActive: resource.isActive,
      role: resource.role
    })
  }
  toEntitiesFromResponse(response: AccountsResponse) {
    return  response.accounts.map(account => this.toEntityFromResource(account));
  }

  toResourceFromEntity(entity: Account) {
    return {
      id: entity.id,
      userId: entity.userId,
      email: entity.email,
      password: entity.password,
      isActive: entity.isActive,
      role: entity.role
    } as AccountResource;
  }
}
