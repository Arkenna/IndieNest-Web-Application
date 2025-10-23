import {Review} from '../../../support/domain/model/review.entity'
import {BaseEntity} from '../../../shared/domain/model/base-entity';

export class Project implements BaseEntity{
  constructor(project:{
    id:number,
    authorId: number,
    name:string,
    description:string,
    creationDate:Date,
    rating:number
  }) {

    this._id = project.id;
    this._authorId = project.authorId;
    this._name = project.name;
    this._description = project.description;
    this._creationDate = project.creationDate;
    this._rating = project.rating;
  }
  private readonly _id:number;
  private readonly _authorId: number; //author's user id
  private _name:string;
  private _description:string;
  private readonly _creationDate:Date;
  private _rating:number;

  get id():number{
    return this._id;
  }
  get authorId():number{
    return this._authorId;
  }
  get name():string{
    return this._name;
  }
  get description():string{
    return this._description;
  }
  get creationDate():Date{
    return this._creationDate;
  }
  get rating():number{
    return this._rating;
  }

  set name(name:string){
    this._name = name;
  }
  set description(description:string){
    this._description = description;
  }
  set rating(rating:number){
    this._rating = rating;
  }

}
