import { Component, OnInit } from '@angular/core';

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
  vacancies$: Object;

  constructor() { }

  ngOnInit() {

    // this.data.getEmployers().subscribe(
    //   data => this.employers$ = data
    // );
    //
    // this.data.getVacancies().subscribe(
    //   data => this.vacancies$ = data
    // );

  }



}
