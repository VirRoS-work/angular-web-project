import {Contact} from "./Contact";
import {Employer} from "./Employer";

export class ContactPerson {

  id?: number;
  first_name: string;
  last_name: string;
  father_name: string;
  contacts: Contact[];
  employer?: Employer;

  constructor(first_name: string, last_name: string, father_name: string, contacts: Contact[],
              id?: number, employer?: Employer) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.father_name = father_name;
    this.contacts = contacts;
    this.id = id;
    this.employer = employer;
  }
}
