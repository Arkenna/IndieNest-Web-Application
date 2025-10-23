import {BaseAssembler} from '../../../shared/infrastructure/base-assembler';
import {GameResource} from '../resources/game-resource';
import {Game} from '../../domain/model/game.entity';
import {GamesResponse} from '../responses/games-response';

export class GameAssembler implements BaseAssembler<Game, GameResource, GamesResponse>{
  toEntityFromResource(resource: GameResource): Game{

    return new Game({
      id:resource.id,
      price:resource.price,
      image:resource.image,
      category:resource.category,
    });
  }
  toEntitiesFromResponse(response: GamesResponse){
    return response.games.map(game => this.toEntityFromResource(game));
  }

  toResourceFromEntity(entity:Game){
    return {
      id:entity.id,
      price:entity.price,
      image:entity.image,
      category:entity.category,
    } as GameResource;
  }
}
