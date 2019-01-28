import {FieldOfActivity} from "./FieldOfActivity";

export class SpecializationVacancy {

  constructor(
    public specialization: string,
    public field_of_activity: FieldOfActivity,
    public id?: number
  ) {}

}
