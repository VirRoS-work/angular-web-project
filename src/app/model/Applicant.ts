import {LanguageSkill} from "./LanguageSkill";
import {SportSkill} from "./SportSkill";
import {Experience} from "./Experience";
import {Education} from "./Education";
import {ContactApplicant} from "./ContactApplicant";
import {SpecializationApplicant} from "./SpecializationApplicant";
import {ApplicantInfo} from "./ApplicantInfo";
import {Book} from "./Book";

export class Applicant {

  id?: number;
  status: string;
  first_name: string;
  last_name: string;
  father_name: string;
  sex: boolean;
  date_of_birth: Date;
  info: ApplicantInfo;
  language_skills: LanguageSkill[];
  sport_skills: SportSkill[];
  experiences: Experience[];
  educations: Education[];
  contacts: ContactApplicant[];
  specializations: SpecializationApplicant[];
  books: Book[];

  constructor(first_name: string, last_name: string, father_name: string, sex: boolean,
              date_of_birth: Date, id?: number, status?: string, info?: ApplicantInfo, language_skills?: LanguageSkill[],
              sport_skills?: SportSkill[], experiences?: Experience[], educations?: Education[],
              contacts?: ContactApplicant[], specialization?: SpecializationApplicant[], books?: Book[]) {
    this.id = id;
    this.status = status;
    this.first_name = first_name;
    this.last_name = last_name;
    this.father_name = father_name;
    this.sex = sex;
    this.date_of_birth = date_of_birth;
    this.info = info;
    this.language_skills = language_skills;
    this.sport_skills = sport_skills;
    this.experiences = experiences;
    this.educations = educations;
    this.contacts = contacts;
    this.specializations = specialization;
    this.books = books;
  }
}
