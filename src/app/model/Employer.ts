import {ContactPerson} from "./ContactPerson";
import {Office} from "./Office";
import {Vacancy} from "./Vacancy";
import {Event} from "./Event";

export class Employer {
  id:number;
  name: string;
  type: string;
  number_of_person: string;
  address: string;
  site: string;
  description: string;
  contacts?: ContactPerson[];
  offices?: Office[];
  vacancies?: Vacancy[];
  events?: Event[];

  constructor(name: string, type: string, number_of_person: string, address: string, site: string,
              description: string, id?: number, contacts?: ContactPerson[], offices?: Office[], vacancies?: Vacancy[],
              events?: Event[]) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.number_of_person = number_of_person;
    this.address = address;
    this.site = site;
    this.description = description;
    this.contacts = contacts;
    this.offices = offices;
    this.vacancies = vacancies;
    this.events = events;
  }
}
