import {Office} from "./Office";
import {SpecializationVacancy} from "./SpecializationVacancy";
import {Employer} from "./Employer";

export class Vacancy {

  id?: number;
  status: string;
  title: string;
  description: string;
  salary_min: number;
  salary_max: number;
  remove_work: boolean;
  type_employment: string;
  experience_min: number;
  office: Office;
  fields: SpecializationVacancy[];
  employer: Employer;
  publication_date: Date;

  constructor(status: string, title: string, description: string, salary_min: number, salary_max: number,
              remove_work: boolean, type_employment: string, experience_min: number, office: Office,
              fields: SpecializationVacancy[], employer?: Employer, id?: number, publication_date?: Date) {
    this.id = id;
    this.status = status;
    this.title = title;
    this.description = description;
    this.salary_min = salary_min;
    this.salary_max = salary_max;
    this.remove_work = remove_work;
    this.type_employment = type_employment;
    this.experience_min = experience_min;
    this.office = office;
    this.fields = fields;
    this.employer = employer;
    this.publication_date = publication_date;
  }
}
