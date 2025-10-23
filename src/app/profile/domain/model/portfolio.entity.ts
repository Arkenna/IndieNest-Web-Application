import {BaseEntity} from '../../../shared/domain/model/base-entity';

export class Portfolio implements BaseEntity{
  private readonly _id: number;
  private readonly _creationDate: Date;
  private _gameIds: number[];

  constructor(portfolio: {
    id: number,
    creationDate: Date,
    gameIds: number[]
  }){
    this._id = portfolio.id;
    this._creationDate = portfolio.creationDate;
    this._gameIds = portfolio.gameIds;
  }

  get id(){return this._id;}
  get creationDate(){return this._creationDate;}
  get gameIds(){return this._gameIds;}

  set gameIds(value){this._gameIds = value;}
}
