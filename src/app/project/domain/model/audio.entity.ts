import {AudioCategory} from "./audio-category"
export class Audio {
  constructor(audio:{id:number,audioUrl:string,format:string,category:AudioCategory}) {
    this._id=audio.id;
    this._audioUrl=audio.audioUrl;
    this._format=audio.format;
    this._category=audio.category;
  }
  private _id:number;

  get id():number {
    return this._id;
  }
  set id(id:number) {
    this._id = id;
  }

  private _audioUrl:string;

  get audioUrl():string{
    return this._audioUrl;
  }
  set audioUrl(value:string){
    this._audioUrl=value;
  }

  private _format:string;

  get format():string{
    return this._format;
  }
  set format(value:string){
    this._format=value;
  }

  private _category:AudioCategory;

  get category():AudioCategory{
    return this._category;
  }
  set category(value:AudioCategory){
    this._category=value;
  }

}
