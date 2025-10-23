import {BaseAssembler} from '../../../shared/infrastructure/base-assembler';
import {AudioResource} from '../resources/audio-resource';
import {Audio} from '../../domain/model/audio.entity';
import {AudiosResponse} from '../responses/audios-response';

export class AudioAssembler implements BaseAssembler<Audio, AudioResource, AudiosResponse>{
  toEntityFromResource(resource: AudioResource): Audio{

    return new Audio({
      id:resource.id,
      audioUrl:resource.audioUrl,
      format:resource.format,
      category:resource.category,
    });
  }
  toEntitiesFromResponse(response: AudiosResponse){
    return response.audios.map(audio => this.toEntityFromResource(audio));
  }

  toResourceFromEntity(entity:Audio){
    return {
      id:entity.id,
      audioUrl:entity.audioUrl,
      format:entity.format,
      category:entity.category,
    } as AudioResource;
  }
}
