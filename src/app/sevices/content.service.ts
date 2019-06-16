import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Vacancy} from "../model/Vacancy";
import {Employer} from "../model/Employer";
import {Applicant} from "../model/Applicant";
import {PageEvent} from "@angular/material";
import {PageInfo} from "../model/PageInfo";
import {EmployerWithCountVacancy} from "../model/EmployerWithCountVacancy";
import {CompanyFilter} from "../model/filters/request/CompanyFilter";
import {EventMessage} from "../model/EventMessage";
import {VacancyFilter} from "../model/filters/request/VacancyFilter";
import {VacancyMessage} from "../model/filters/responce/VacancyMessage";

@Injectable({
  providedIn: "root"
})
export class ContentService {
  private host = 'http://localhost:8080/api/content';

  constructor(private http: HttpClient) { }

  getEmployers() {
    return this.http.get(this.host + "/count_vacancies");
  }

  getTop10ActiveVacancies(): Observable<VacancyMessage[]>{
    return this.http.get<VacancyMessage[]>(this.host + "/last_vacancies");
  }

  getVacancies(): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(this.host + "/vacancies");
  }

  getVacanciesPageable(pageInfo: PageInfo): Observable<Vacancy[]> {
    return this.http.post<Vacancy[]>(this.host + "/vacancies", pageInfo);
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

  downloadPDF(id: number): Observable<Blob> {
    return this.http.get(this.host + "/summary/" + id, {responseType: 'blob'});
  }

  getCountCompanies(): Observable<String> {
    return this.http.get(this.host + "/employers", {responseType: 'text'});
  }

  getCountCompaniesFilter(filter: CompanyFilter) {
    return this.http.post(this.host + "/filter/employers/count", filter, {responseType: "text"});
  }

  getCompaniesFilter(filter: CompanyFilter): Observable<EmployerWithCountVacancy[]> {
    return this.http.post<EmployerWithCountVacancy[]>(this.host + "/filter/employers", filter);
  }

  getCountVacanciesFilter(filter: VacancyFilter){
    return this.http.post(this.host + "/filter/vacancies/count", filter, {responseType: "text"});
  }

  getVacanciesFilter(filter: VacancyFilter): Observable<VacancyMessage[]> {
    return this.http.post<VacancyMessage[]>(this.host + "/filter/vacancies", filter);
  }


  getCompanies(pageInfo: PageInfo): Observable<EmployerWithCountVacancy[]> {
    return this.http.post<EmployerWithCountVacancy[]>(this.host + "/employers", pageInfo);
  }

  getEventById(id: number): Observable<EventMessage> {
    return this.http.get<EventMessage>(this.host + "/event/" + id);
  }

  getNearestEvents(): Observable<EventMessage[]> {
    return this.http.get<EventMessage[]>(this.host + "/events/nearest");
  }


}
