import { Injectable } from '@angular/core';
import { Dish } from '../share/dish';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../share/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHttpMsgService } from '../services/process-http-msg.service';
@Injectable({
  providedIn: 'root',
})
export class DishService {
  constructor(private http: HttpClient, 
    private processHttpMsgService: ProcessHttpMsgService) {}

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL + 'dishes')
    .pipe(catchError(this.processHttpMsgService.handleError)); // converted to a promise
  }

  getDish(id: string): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id)
    .pipe(catchError(this.processHttpMsgService.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true')
    .pipe(map(dishes => dishes[0]))
    .pipe(catchError(this.processHttpMsgService.handleError));
  }

  getDishIds(): Observable<string[] | any>{
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
    .pipe(catchError(error => error)); // since the error handle is already implemented to getDishes(),
    // is only necessary to catch the error.
  }

  putDish(dish:Dish): Observable <Dish> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' // Specifies that it's a json 

      })
    };

    return this.http.put<Dish>(baseURL + 'dishes/' + dish.id, dish, httpOptions)
    .pipe(catchError(this.processHttpMsgService.handleError));
  }

}
