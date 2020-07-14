import { Component, OnInit } from '@angular/core';
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

  constructor(private dishService: DishService, private promotionService: PromotionService,
    private leaderService: LeaderService) { }

  ngOnInit(): void {
    this.dish = this.dishService.getFeaturedDish();
    this.promotion = this.promotionService.getFeaturedPromotion();
    this.leader = this.leaderService.getFeaturedLeader();
  }

}
