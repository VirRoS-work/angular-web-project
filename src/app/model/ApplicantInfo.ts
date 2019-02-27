export class ApplicantInfo {

  ready_to_move: boolean;
  ready_for_remove_work: boolean;
  city: string;
  citizenship: string;
  family_status: string;
  children: boolean;
  about_me: string;
  hobby: string;
  salary: number;
  academic_degree: string;

  constructor(ready_to_move: boolean, ready_for_remove_work: boolean, city: string, citizenship: string, family_status: string, children: boolean, about_me: string, hobby: string, salary: number, academic_degree: string) {
    this.ready_to_move = ready_to_move;
    this.ready_for_remove_work = ready_for_remove_work;
    this.city = city;
    this.citizenship = citizenship;
    this.family_status = family_status;
    this.children = children;
    this.about_me = about_me;
    this.hobby = hobby;
    this.salary = salary;
    this.academic_degree = academic_degree;
  }
}
