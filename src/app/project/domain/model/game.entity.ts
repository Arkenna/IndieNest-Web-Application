import {GameCategory} from './game-category';

export class Game {
  constructor(game:{price:number,image:string,category:GameCategory}) {
    this._price=game.price;
    this._image=game.image;
    this._category=game.category;
  }

  private _price:number;

  get price():number{
    return this._price;
  }
  set price(value:number){
    this._price = value;
  }

  private _image:string;

  get image():string{
    return this._image;
  }
  set image(image:string){
    this._image = image;
  }

  private _category:GameCategory;

  get category():GameCategory{
    return this._category;
  }
  set category(value:GameCategory){
    this._category = value;
  }

}
