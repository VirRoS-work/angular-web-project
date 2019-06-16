import {Event} from "./Event";

export class EventMessage {

  event: Event;
  employer_id: number;
  employer_name: string;

  constructor(event: Event, employer_id: number, employer_name: string) {
    this.event = event;
    this.employer_id = employer_id;
    this.employer_name = employer_name;
  }

}
