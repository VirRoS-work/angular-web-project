import {Office} from "./Office";
import {ContactPerson} from "./ContactPerson";

export class Employer {

  constructor(
    public name: string,
    public type: string,
    public number_of_person: string,
    public address: string,
    public site: string,
    public description: string,
    public offices: Office[],
    public contacts: ContactPerson[],
    public id?: number
  ) {}

}
