import {Employer} from "./Employer";

export class EmployerWithCountVacancy {

  employer: Employer;
  count: number;

  constructor(employer: Employer, count: number) {
    this.employer = employer;
    this.count = count;
  }

}
