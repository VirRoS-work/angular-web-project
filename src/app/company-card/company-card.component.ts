import {Component, Input, OnInit} from '@angular/core';
import {EmployerWithCountVacancy} from "../model/EmployerWithCountVacancy";

@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.css']
})
export class CompanyCardComponent implements OnInit {

  @Input() employer: EmployerWithCountVacancy;

  constructor() { }

  ngOnInit() {
  }

}
