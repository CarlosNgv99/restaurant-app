import { Injectable } from '@angular/core';
import { Promotion } from '../share/promotion';
import { PROMOTIONS } from '../share/promotions';
import { Observable,of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Observable <Promotion[]> {
    return of(PROMOTIONS).pipe(delay(1000));
  }

  getPromotion(id: string): Observable <Promotion> {
    return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(1000));
  }

  getFeaturedPromotion(): Observable <Promotion> {
    return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(1000));
  }


}
