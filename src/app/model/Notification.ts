import {Applicant} from "./Applicant";
import {Vacancy} from "./Vacancy";

export class Notification {

  id: number;
  applicant: Applicant;
  vacancy: Vacancy;
  date: Date;

  constructor(applicant: Applicant, vacancy: Vacancy, id?: number,  date?: Date) {
    this.id = id;
    this.applicant = applicant;
    this.vacancy = vacancy;
    this.date = date;
  }
}
