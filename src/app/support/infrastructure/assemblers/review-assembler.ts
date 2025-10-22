import {BaseAssembler} from '../../../shared/infrastructure/base-assembler';
import {ReviewResource} from '../resources/review-resource';
import {Review} from '../../domain/model/review.entity';
import {ReviewsResponse} from '../responses/reviews-response';
import {UserAssembler} from '../../../iam/infrastructure/assemblers/user-assembler';

export class ReviewAssembler implements BaseAssembler<Review, ReviewResource, ReviewsResponse> {
  constructor(private userAssembler = new UserAssembler()) {}
  toEntityFromResource(resource: ReviewResource): Review{

    return new Review({
      id:resource.id,
      user:this.userAssembler.toEntityFromResource(resource.user),
      comment:resource.comment,
      rating: resource.rating,
      creationDate:resource.creationDate
    });
  }
  toEntitiesFromResponse(response: ReviewsResponse){
    return response.reviews.map(review => this.toEntityFromResource(review));
  }

  toResourceFromEntity(entity:Review){
    return {
      id:entity.id,
      user:this.userAssembler.toEntityFromResource(entity.user),
      comment:entity.comment,
      rating: entity.rating,
      creationDate:entity.creationDate
    } as ReviewResource;
  }
}
