import { Component, OnInit } from '@angular/core';
import { Dish } from '../share/dish';
import { DishService } from '../services/dish.service'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  
  dishes: Dish[];

  selectedDish: Dish;

  constructor(private dishService: DishService) { }

  ngOnInit(): void {
    this.dishService.getDishes()
    .subscribe((dishes) => { // dishes are the dish array we received from the promise
      this.dishes = dishes // Obtenined dish form dish service promise 
    });
  }

  onSelect(dish: Dish){
    this.selectedDish = dish;
  }

}
