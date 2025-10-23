import {ArtCategory} from '../../domain/model/art-category';
import {BaseResource} from '../../../shared/infrastructure/base-resource';

export interface ArtResource extends BaseResource {
  id:number;
  image: string;
  category:ArtCategory;
}
