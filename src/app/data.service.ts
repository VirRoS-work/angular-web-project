import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const address = 'http://localhost:8080/RESTjob/rest/';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getEmployers() {
    return this.http.get(address + 'employer/count_vacancies');
  }

  getEmployer(employerId) {
    return this.http.get(address + 'employer/' + employerId);
  }

  getCompanyOffices(employerId) {
    return this.http.get(address + 'employer/' + employerId + '/offices');
  }

  getCompanyVacancies(employerId) {
    return this.http.get(address + 'employer/' + employerId + '/vacancies');
  }

  getVacancy(vacancyId) {
    return this.http.get(address + 'vacancy/' + vacancyId);
  }

  getTypesEmployer() {
    return this.http.get(address + 'info/employer_types')
  }

  getCountEmployees() {
    return this.http.get(address + 'info/count_employees')
  }

  regEmployer(body: Object) {
    return this.http.post(address + 'employer/', body);
  }

  delOffice(id: number){
    return this.http.delete(address + 'office/' + id);
  }

  regOffice(body: Object){
    return this.http.post(address + 'office', body);
  }

}
