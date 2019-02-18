import {ContactType} from "./ContactType";
import {Applicant} from "./Applicant";

export class ContactApplicant {

  id?: number;
  applicant: Applicant;
  contact_type: ContactType;
  value: string;

  constructor(contact_type: ContactType, value: string, id?: number, applicant?: Applicant) {
    this.id = id;
    this.applicant = applicant;
    this.contact_type = contact_type;
    this.value = value;
  }
}
