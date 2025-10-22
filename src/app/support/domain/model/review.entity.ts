import {User} from '../../../iam/domain/model/user.entity';

export class Review {
  constructor(review:{id:number, user:User,comment:string, rating:number,creationDate:string}) {
    this._id = review.id;
    this._user = review.user;
    this._comment=review.comment;
    this._rating=review.rating;
    this._creationDate=review.creationDate;
  }

  private _id:number;
  private _user:User;
  private _comment:string;
  private _rating:number;
  private _creationDate:string;

  get id():number{
    return this._id;
  }
  get user():User{
    return this._user;
  }
  get comment():string{
    return this._comment;
  }
  get rating():number{
    return this._rating;
  }
  get creationDate():string{
    return this._creationDate;
  }
}

