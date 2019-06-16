import { Component, OnInit } from '@angular/core';
import {Vacancy} from "../model/Vacancy";
import {ContentService} from "../sevices/content.service";
import {PageEvent} from '@angular/material';
import {PageInfo} from "../model/PageInfo";
import {VacancyFilter} from "../model/filters/request/VacancyFilter";
import {VacancyMessage} from "../model/filters/responce/VacancyMessage";

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['../css/base.css', './vacancies.component.css']
})
export class VacanciesComponent implements OnInit {

  // MatPaginator Inputs
  length = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [2, 5, 10, 25, 100];

  // MatPaginator Output
  vacancies$: VacancyMessage[];

  filter: VacancyFilter = new VacancyFilter("", false, new PageInfo(0, this.pageSize));

  constructor(private content: ContentService) { }

  ngOnInit() {

    this.content.getCountVacanciesFilter(this.filter).subscribe(
      data => this.length = Number(data)
    );

    this.content.getVacanciesFilter(this.filter).subscribe(
      data => this.vacancies$ = data
    );
  }

  getListVacancies(pageEvent: PageEvent){

    this.pageSize = pageEvent.pageSize;
    this.filter.info.pageIndex = pageEvent.pageIndex;
    this.filter.info.pageSize = pageEvent.pageSize;

    this.content.getCountVacanciesFilter(this.filter).subscribe(
      data => this.length = Number(data)
    );

    this.content.getVacanciesFilter(this.filter).subscribe(
      data => this.vacancies$ = data
    );

  }

  getFindVacancies(): void {

    this.filter.info = new PageInfo(0, this.pageSize);

    this.content.getCountVacanciesFilter(this.filter).subscribe(
      data => this.length = Number(data)
    );

    this.content.getVacanciesFilter(this.filter).subscribe(
      data => this.vacancies$ = data
    );


    console.log(this.filter);
  }

}
