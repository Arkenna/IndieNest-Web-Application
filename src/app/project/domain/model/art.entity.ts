import {ArtCategory} from "./art-category"
export class Art {
  constructor(art:{image:string,category:ArtCategory}) {
    this._image=art.image;
    this._category=art.category;
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
