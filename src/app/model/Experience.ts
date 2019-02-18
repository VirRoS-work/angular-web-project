import {Applicant} from "./Applicant";

export class Experience {

  id?: number;
  applicant?: Applicant;
  company_name: string;
  position: string;
  date_start: Date;
  date_end: Date;
  duties: string;
  achievements: string;

  constructor(company_name: string, position: string, date_start: Date, date_end: Date,
              duties: string, achievements: string, id?: number, applicant?: Applicant) {
    this.id = id;
    this.applicant = applicant;
    this.company_name = company_name;
    this.position = position;
    this.date_start = date_start;
    this.date_end = date_end;
    this.duties = duties;
    this.achievements = achievements;
  }
}
