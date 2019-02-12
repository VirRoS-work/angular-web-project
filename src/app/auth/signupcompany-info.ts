import {SignUpInfo} from "./signup-info";

export class SignUpCompanyInfo {
  signUpForm: SignUpInfo;
  name: string;
  type: string;
  count: string;
  address: string;
  site: string;
  description: string;

  constructor(username: string, password: string, email: string, role: string[], name: string,
              type: string, count: string, address: string, site: string, description: string) {
    this.signUpForm = new SignUpInfo(username, password, email, role);
    this.name = name;
    this.type = type;
    this.count = count;
    this.address = address;
    this.site = site;
    this.description = description;
  }

}
