import {LanguageSkill} from "./LanguageSkill";
import {SportSkill} from "./SportSkill";
import {Experience} from "./Experience";
import {Education} from "./Education";
import {ContactApplicant} from "./ContactApplicant";

export class Applicant {

  id?: number;
  status: string;
  first_name: string;
  last_name: string;
  father_name: string;
  sex: boolean;
  date_of_birth: Date;
  language_skills: LanguageSkill[];
  sport_skills: SportSkill[];
  experiences: Experience[];
  educations: Education[];
  contacts: ContactApplicant[];

  constructor(first_name: string, last_name: string, father_name: string, sex: boolean,
              date_of_birth: Date, id?: number, status?: string, language_skills?: LanguageSkill[],
              sport_skills?: SportSkill[], experiences?: Experience[], educations?: Education[],
              contacts?: ContactApplicant[]) {
    this.id = id;
    this.status = status;
    this.first_name = first_name;
    this.last_name = last_name;
    this.father_name = father_name;
    this.sex = sex;
    this.date_of_birth = date_of_birth;
    this.language_skills = language_skills;
    this.sport_skills = sport_skills;
    this.experiences = experiences;
    this.educations = educations;
    this.contacts = contacts;
  }
}
