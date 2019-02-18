import {SignUpInfo} from "./signup-info";

export class SignUpApplicantInfo {
  signUpForm: SignUpInfo;
  first_name: string;
  last_name: string;
  father_name: string;
  sex: boolean;
  date_of_birth: Date;

  constructor(login: string, password: string, email: string, first_name: string, last_name: string,
              father_name: string, sex: boolean, date_of_birth: Date) {
    this.signUpForm = new SignUpInfo(login, password, email, ['user']);
    this.first_name = first_name;
    this.last_name = last_name;
    this.father_name = father_name;
    this.sex = sex;
    this.date_of_birth = date_of_birth;
  }

}
