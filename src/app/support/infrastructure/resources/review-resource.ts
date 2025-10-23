import {BaseResource} from '../../../shared/infrastructure/base-resource';
import {UserResource} from '../../../iam/infrastructure/resources/user-resource';

export interface ReviewResource extends BaseResource {
  id: number;
  user:UserResource;
  comment:string;
  rating:number;
  creationDate:string;
}
