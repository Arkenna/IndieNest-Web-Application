import {ArtCategory} from "./art-category"
export class Art {
  constructor(art:{id:number,image:string,category:ArtCategory}) {
    this._id=art.id;
    this._image=art.image;
    this._category=art.category;
  }
  private _id:number;

  get id():number{
    return this._id;
  }

  set id(id:number){
    this._id=id;
  }

  private _image:string;

  get image():string{
    return this._image;
  }
  set image(image:string){
    this._image = image;
  }

  private _category:ArtCategory;

  get category():ArtCategory{
    return this._category;
  }
  set category(_category:ArtCategory){
    this._category = _category;
  }


}
