import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Vacancy} from "../model/Vacancy";
import {Employer} from "../model/Employer";
import {Applicant} from "../model/Applicant";

@Injectable({
  providedIn: "root"
})
export class ContentService {
  private host = 'http://localhost:8080/api/content';

  constructor(private http: HttpClient) { }

  getEmployers() {
    return this.http.get(this.host + "/count_vacancies");
  }

  getTop10ActiveVacancies(): Observable<Vacancy[]>{
    return this.http.get<Vacancy[]>(this.host + "/last_vacancies");
  }

  getVacancyById(id: number): Observable<Vacancy> {
    return this.http.get<Vacancy>(this.host + "/vacancy/" + id);
  }

  getEmployerByVacancyId(id: number): Observable<Employer> {
    return this.http.get<Employer>(this.host + "/company/vacancy/"+ id);
  }

  getCompanyById(id: number): Observable<Employer> {
    return this.http.get<Employer>(this.host + "/company/" + id);
  }

  getUsers(): Observable<Applicant[]> {
    return this.http.get<Applicant[]>(this.host + "/applicants");
  }

  getUserById(id: number): Observable<Applicant> {
    return this.http.get<Applicant>(this.host + "/applicant/" + id);
  }
}
