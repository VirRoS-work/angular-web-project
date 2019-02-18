import {ContactType} from "./ContactType";
import {ContactPerson} from "./ContactPerson";

export class Contact {

  id?: number;
  contact_person: ContactPerson;
  contact_type: ContactType;
  value: string;

  constructor(contact_person: ContactPerson, contact_type: ContactType, value: string, id?: number) {
    this.contact_person = contact_person;
    this.contact_type = contact_type;
    this.value = value;
    this.id = id;
  }
}
