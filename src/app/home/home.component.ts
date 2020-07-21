import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../share/dish';
import { DishService }  from '../services/dish.service';
import { Promotion } from '../share/promotion';
import { PromotionService}  from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../share/leader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMsg: string;
  promErrMsg: string;
  leadErrMsg: string;

  constructor(private dishService: DishService, private promotionService: PromotionService,
    private leaderService: LeaderService, @Inject('BaseURL') private BaseURL) { }

  ngOnInit(): void {
    this.dishService.getFeaturedDish()
    .subscribe((dish) => {
      this.dish = dish
    },
      errmsg => this.dishErrMsg = <any>errmsg
    );
    this.promotionService.getFeaturedPromotion()
    .subscribe((promotion) => {
      this.promotion = promotion
    },
      errmsg => this.promErrMsg = <any>errmsg
    );
    this.leaderService.getFeaturedLeader()
    .subscribe((leader) => {
      this.leader = leader
    },
      errmsg => this.leadErrMsg = <any>errmsg
    );
    
  }

}
