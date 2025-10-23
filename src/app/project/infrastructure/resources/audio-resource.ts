import {AudioCategory} from '../../domain/model/audio-category';
import {BaseResource} from '../../../shared/infrastructure/base-resource';

export interface AudioResource extends BaseResource{
  id:number;
  audioUrl:string;
  format:string;
  category:AudioCategory;
}
