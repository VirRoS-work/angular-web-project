import {Vacancy} from "../../Vacancy";

export class VacancyMessage {

  vacancy: Vacancy;
  employer_id: number;
  employer_name: string;

  constructor(vacancy: Vacancy, employer_id: number, employer_name: string) {
    this.vacancy = vacancy;
    this.employer_id = employer_id;
    this.employer_name = employer_name;
  }
}
