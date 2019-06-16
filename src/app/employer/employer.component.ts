import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ContentService} from "../sevices/content.service";
import {Employer} from "../model/Employer";
import {VacancyMessage} from "../model/filters/responce/VacancyMessage";
import {Vacancy} from "../model/Vacancy";

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.css', '../css/base.css']
})
export class EmployerComponent implements OnInit {

  employer$: Employer = new Employer(null, null, null, null, null, null);
  vacancies$: VacancyMessage[] = [];

  constructor(private route: ActivatedRoute, private content: ContentService) {
    this.route.params.subscribe(
      params => this.employer$.id = params.id
    );
  }

  ngOnInit() {

    this.content.getCompanyById(this.employer$.id).subscribe(
      data => {
        this.employer$ = data;
        this.getVacancyMessagesFromVacancies(data.vacancies);
      }
    );
  }

  private getVacancyMessagesFromVacancies(vacancies: Vacancy[]): void {
    vacancies.forEach(v => this.vacancies$.push(new VacancyMessage(v, null, null)));
  }
}
