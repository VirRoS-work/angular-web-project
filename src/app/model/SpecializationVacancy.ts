import {Vacancy} from "./Vacancy";
import {FieldOfActivity} from "./FieldOfActivity";

export class SpecializationVacancy {

  id?: number;
  vacancy: Vacancy;
  field_of_activity: FieldOfActivity;
  specialization: string;

  constructor(vacancy: Vacancy, field_of_activity: FieldOfActivity, specialization: string, id?: number) {
    this.id = id;
    this.vacancy = vacancy;
    this.field_of_activity = field_of_activity;
    this.specialization = specialization;
  }
}
