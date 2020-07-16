import { Injectable } from '@angular/core';
import { Leader } from '../share/leader';
import { LEADERS } from '../share/leaders';
import { Observable,of } from 'rxjs';
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Observable<Leader[]> {
    return of(LEADERS).pipe(delay(1000));
  }

  getLeader(id: string): Observable <Leader>{

    return of(LEADERS.filter((leader) => (leader.id == id))[0]).pipe(delay(1000));

  }
  getFeaturedLeader() {
    return of(LEADERS.filter((leader) => leader.featured)).pipe(delay(1000));
  }
}
