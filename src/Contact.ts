import {ContactType} from "./ContactType";

export class Contact {

  constructor(
    public contact_type: ContactType,
    public value: string,
    public id?: number
  ) {}

}
