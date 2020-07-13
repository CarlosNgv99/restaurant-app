import { Injectable } from '@angular/core';
import { Dish } from '../share/dish';
import { DISHES } from '../share/dishes' ;
@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Dish[]{
    return DISHES;
  }

  getDish(id: string): Dish {
    return DISHES.filter((dish) => (dish.id == id))[0]; // Returns an array, but with the [0] returns the first import statement
                                                        // of this array.
  }
  getFeaturedDish(): Dish{
    return  DISHES.filter((dish) => dish.featured)[0]; // return dish if featured is true
  }

}
