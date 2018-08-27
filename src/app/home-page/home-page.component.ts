import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

export interface InfoCompany {
  id: string;
  name: string;
  count: string;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  employers$: Object;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getEmployers().subscribe(
      data => this.employers$ = data
    );
  }



}
