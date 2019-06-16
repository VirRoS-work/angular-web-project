import { Component, OnInit } from '@angular/core';
import {ContentService} from "../sevices/content.service";
import {PageInfo} from "../model/PageInfo";
import {PageEvent} from "@angular/material";
import {EmployerWithCountVacancy} from "../model/EmployerWithCountVacancy";
import {CompanyFilter} from "../model/filters/request/CompanyFilter";

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['../css/base.css', './companies.component.css']
})
export class CompaniesComponent implements OnInit {

  // MatPaginator Inputs
  isEmptyCompany = true;
  length = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [2, 5, 10, 25, 50];

  // MatPaginator Output
  pageEvent: PageEvent;
  companies$: EmployerWithCountVacancy[];

  filter: CompanyFilter = new CompanyFilter("", this.isEmptyCompany, new PageInfo(0, this.pageSize));


  constructor(private content: ContentService) { }

  ngOnInit() {

    this.content.getCountCompaniesFilter(this.filter).subscribe(
      data => this.length = Number(data)
    );

    this.content.getCompaniesFilter(this.filter).subscribe(
      data => this.companies$ = data
    );

  }

  getListCompanies(pageEvent: PageEvent){

    this.pageSize = pageEvent.pageSize;
    this.filter.info.pageIndex = pageEvent.pageIndex;
    this.filter.info.pageSize = pageEvent.pageSize;

    this.content.getCountCompaniesFilter(this.filter).subscribe(
      data => this.length = Number(data)
    );

    this.content.getCompaniesFilter(this.filter).subscribe(
      data => this.companies$ = data
    );

  }

  getFindCompanies(name: string): void{

    this.filter.name = name;
    this.filter.isEmptyCompany = this.isEmptyCompany;
    this.filter.info = new PageInfo(0, this.pageSize);

    this.content.getCountCompaniesFilter(this.filter).subscribe(
      data => this.length = Number(data)
    );

    this.content.getCompaniesFilter(this.filter).subscribe(
      data => this.companies$ = data
    );
  }

}
