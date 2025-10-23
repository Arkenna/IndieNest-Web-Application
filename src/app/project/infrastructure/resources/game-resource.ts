import {GameCategory} from '../../domain/model/game-category';
import {BaseResource} from '../../../shared/infrastructure/base-resource';

export interface GameResource extends BaseResource {
  id:number;
  price:number;
  image:string;
  category:GameCategory;
}
