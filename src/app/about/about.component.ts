import { Component, OnInit, Inject } from '@angular/core';
import { LEADERS } from '../share/leaders';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../share/leader';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leaders: Leader[];

  constructor(private leaderService: LeaderService,
    @Inject('BaseURL') private BaseURL) { }
  ngOnInit(): void {
    this.leaderService.getLeaders()
    .subscribe((leaders) => {
      this.leaders = leaders
    });
  }

}
