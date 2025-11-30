import {BaseAssembler} from '../../../shared/infrastructure/base-assembler';
import {UsersResponse} from '../responses/users-response';
import {User} from '../../domain/model/user.entity';
import {UserResource} from '../resources/user-resource';

export class UserAssembler implements BaseAssembler <User, UserResource, any> {

  toEntityFromResource(resource: UserResource): User{
    return new User({
      id: resource.id,
      name: resource.name,
      phoneNumber: resource.phoneNumber
    });
  }

  toEntitiesFromResponse(response: any): User[] {
    const data = Array.isArray(response) ? response : (response.users || []);
    return data.map((user: UserResource) => this.toEntityFromResource(user));
  }

  toResourceFromEntity(entity:User){
    return {
      id: entity.id,
      name: entity.name,
      phoneNumber: entity.phoneNumber
    } as UserResource;
  }
}
