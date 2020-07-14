import { Component, OnInit } from '@angular/core';
import { LEADERS } from '../share/leaders';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../share/leader';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {


  constructor(private leaderService: LeaderService) { }
  leaders: Leader[] = this.leaderService.getLeaders();

  ngOnInit(): void {
  }

}
