import {BaseAssembler} from '../../../shared/infrastructure/base-assembler';
import {Art} from '../../domain/model/art.entity';
import {ArtResource} from '../resources/art-resource';
import {ArtsResponse} from '../responses/arts-response';

export class ArtAssembler implements BaseAssembler<Art, ArtResource, ArtsResponse> {
  toEntityFromResource(resource: ArtResource): Art{

    return new Art({
      id: resource.id,
      image: resource.image,
      category: resource.category,
    });
  }
  toEntitiesFromResponse(response: ArtsResponse){
    return response.arts.map(art => this.toEntityFromResource(art));
  }

  toResourceFromEntity(entity:Art){
    return {
      id: entity.id,
      image: entity.image,
      category: entity.category,
    } as ArtResource;
  }
}
