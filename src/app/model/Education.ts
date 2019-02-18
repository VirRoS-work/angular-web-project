import {Applicant} from "./Applicant";

export class Education {

  id?: number;
  applicant?: Applicant;
  educational_institution: string;
  faculty: string;
  specialization: string;
  date_start: Date;
  date_end: Date;
  level_education: string;
  form_training: string;


  constructor(educational_institution: string, faculty: string, specialization: string, date_start: Date,
              date_end: Date, level_education: string, form_training: string, id?: number, applicant?: Applicant) {
    this.id = id;
    this.applicant = applicant;
    this.educational_institution = educational_institution;
    this.faculty = faculty;
    this.specialization = specialization;
    this.date_start = date_start;
    this.date_end = date_end;
    this.level_education = level_education;
    this.form_training = form_training;
  }
}
