import { Component, OnInit } from '@angular/core';
import {ContentService} from "../sevices/content.service";
import {Vacancy} from "../model/Vacancy";

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
  vacancies$: Vacancy[];

  constructor(private content: ContentService) { }

  ngOnInit() {

    this.content.getEmployers().subscribe(
      data => this.employers$ = data
    );

    this.content.getTop10ActiveVacancies().subscribe(
      data => this.vacancies$ = data
    );

  }



}
