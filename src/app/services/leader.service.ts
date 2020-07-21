import { Injectable } from '@angular/core';
import { Leader } from '../share/leader';
import { Observable,of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../share/baseurl';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {
  leader: Leader;

  constructor(private http: HttpClient) { }

  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'leadership');
  }

  getLeader(id: string): Observable <Leader>{
    return this.http.get<Leader>(baseURL + 'leadership/' + id);
  }
  getFeaturedLeader(): Observable <Leader> {
    return this.http.get<Leader[]>(baseURL + 'leadership?featured=true')
    .pipe(map(leaders => leaders[0]
      ));
  }
}
