import {Review} from '../../../support/domain/model/review.entity'

export class Project{
  constructor(project:{id:number, name:string, creationDate:string,author:string,description:string,rating:number, reviews:Review[]}) {
    this._id = project.id;
    this._name = project.name;
    this._description = project.description;
    this._rating = project.rating;
    this._creationDate = project.creationDate;
    this._author = project.author;
    this.reviews = project.reviews;

  }
  private _id:number;
  private _name:string;
  private _creationDate:string;
  private _author:string;
  private _description:string;
  private _rating:number;
  private reviews:Review[];

  get id():number{
    return this._id;
  }
  get name():string{
    return this._name;
  }
  get creationDate():string{
    return this._creationDate;
  }
  get author():string{
    return this._author;
  }
  get description():string{
    return this._description;
  }
  get rating():number{
    return this._rating;
  }
  get review():Review[]{
    return this.reviews;
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
