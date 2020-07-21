import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../share/dish';
import { DishService } from '../services/dish.service'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  
  dishes: Dish[];
  errMsg: string;

  constructor(private dishService: DishService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit(): void {
    this.dishService.getDishes()
    .subscribe((dishes) => this.dishes = dishes, // dishes are the dish array we received from the promise.Obtenined dish form dish service promise
      errmsg => this.errMsg = <any>errmsg);
  }
  
}
