import {BaseEntity} from '../../../shared/domain/model/base-entity';

export class Publication implements BaseEntity {
  private readonly _id: number;
  private readonly _userId: number;
  private _comment: string;
  private _image: string;
  private readonly _creationDate: Date;

  constructor(publication:{
    id:number,
    userId:number,
    comment:string,
    image:string,
    creationDate:Date,
  }) {
    this._id = publication.id;
    this._userId = publication.userId;
    this._comment = publication.comment;
    this._image = publication.image;
    this._creationDate = publication.creationDate;
  }

  get id(){return this._id;}
  get userId(){return this._userId;}
  get comment(){return this._comment;}
  get image(){return this._image;}
  get creationDate(){return this._creationDate;}

  set comment(value:string){this._comment = value;}
  set image(value:string){this._image = value;}
}
