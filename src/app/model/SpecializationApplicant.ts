import {Applicant} from "./Applicant";
import {FieldOfActivity} from "./FieldOfActivity";

export class SpecializationApplicant {

  id?: number;
  applicant: Applicant;
  field_of_activity: FieldOfActivity;
  specialization: string;

  constructor(field_of_activity: FieldOfActivity, specialization: string, id?: number, applicant?: Applicant) {
    this.id = id;
    this.applicant = applicant;
    this.field_of_activity = field_of_activity;
    this.specialization = specialization;
  }
}
