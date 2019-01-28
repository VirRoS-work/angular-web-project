import {Contact} from "../Contact";

export class ContactPerson {

  constructor (
    public first_name: string,
    public last_name: string,
    public father_name: string,
    public contacts: Contact[],
    public id?: number
  ) {}

}
