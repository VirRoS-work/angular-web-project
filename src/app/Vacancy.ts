import {Office} from "./Office";
import {SpecializationVacancy} from "./SpecializationVacancy";
import {Employer} from "./Employer";

export class Vacancy {

  constructor(
    public status: string,
    public title: string,
    public description: string,
    public salary_min: number,
    public salary_max: number,
    public remove_work: boolean,
    public type_employment: string,
    public experience_min: number,
    public office: Office,
    public fields: SpecializationVacancy[],
    public id?: number,
    public employer?: Employer
  ) {}

}
