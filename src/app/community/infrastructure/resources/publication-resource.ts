import {BaseResource} from '../../../shared/infrastructure/base-resource';

export interface PublicationResource extends BaseResource {
  id:number,
  userId:number,
  comment:string,
  image:string,
  creationDate:Date
}
