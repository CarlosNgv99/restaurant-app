import { Injectable } from '@angular/core';
import { Dish } from '../share/dish';
import { DISHES } from '../share/dishes';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class DishService {
  constructor() {}

  getDishes(): Observable<Dish[]> {
    return of(DISHES).pipe(delay(1000)); // converted to a promise
  }

  getDish(id: string): Observable<Dish> {
    return of(DISHES.filter((dish) => dish.id == id)[0]).pipe(delay(1000));
  }

  getFeaturedDish(): Observable<Dish> {
    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(1000));
  }

  getDishIds(): Observable<string[] | any>{
    return of(DISHES.map(dish => dish.id)); // Iterates each dish of the list and extracts each
    // id of each dish to return a list of ids
  }

}
