import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import {getBodyNode} from "@angular/animations/browser/src/render/shared";
import {Employer} from "./Employer";
import {ContactType} from "../ContactType";
import {ContactPerson} from "./ContactPerson";
import {Office} from "./Office";
import {Vacancy} from "./Vacancy";
import {FieldOfActivity} from "./FieldOfActivity";

const address = 'http://localhost:8080/RESTjob/rest/';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  //Employer

  getEmployers() {
    return this.http.get<Employer[]>(address + 'employer/count_vacancies');
  }

  getEmployer(employerId) {
    return this.http.get<Employer>(address + 'employer/' + employerId);
  }

  //Office

  getCompanyOffices(employerId) {
    return this.http.get<Office[]>(address + 'employer/' + employerId + '/offices');
  }

  //Vacancy

  getVacancy(vacancyId) {
    return this.http.get<Vacancy>(address + 'vacancy/' + vacancyId);
  }

  getVacancies() {
    return this.http.get<Vacancy[]>(address + 'vacancy/all');
  }

  getCompanyVacancies(employerId) {
    return this.http.get<Vacancy[]>(address + 'employer/' + employerId + '/vacancies');
  }

  getCompanyActiveVacancies(employerId) {
    return this.http.get<Vacancy[]>(address + 'employer/' + employerId + '/active_vacancies')
  }

  regVacancy(body: Object){
    return this.http.post(address + "vacancy", body);
  }

  addSpecializationByVacancy(body: Object){
    return this.http.post(address + "specializationvacancy", body);
  }

  delSpecializationByVacancy(id: number){
    return this.http.delete(address + "specializationvacancy/" + id);
  }


  getTypesEmployer() {
    return this.http.get(address + 'info/employer_types');
  }

  getTypesEmployment() {
    return this.http.get(address + 'info/employment_types');
  }

  getCountEmployees() {
    return this.http.get(address + 'info/count_employees')
  }

  regEmployer(body: Object) {
    return this.http.post(address + 'employer', body);
  }

  delOffice(id: number){
    return this.http.delete(address + 'office/' + id);
  }

  delVacancy(id: number){
    return this.http.delete(address + 'vacancy/' + id);
  }

  regOffice(body: Object){
    return this.http.post(address + 'office', body);
  }

  //ContactPerson

  getContactPerson(id: number){
    return this.http.get<ContactPerson>(address + "contactperson/" + id);
  }

  regContactPerson(body: Object){
    return this.http.post(address + "contactperson", body);
  }

  delContactPerson(id: number){
    return this.http.delete(address + "contactperson/" + id);
  }

  getCompanyContactPersons(employerId) {
    return this.http.get<ContactPerson[]>(address + 'employer/' + employerId + '/contacts');
  }

  //Contact

  addContactByContactPerson(body: Object){
    return this.http.post(address + "contactscontactperson", body);
  }

  delContactByContactPerson(id: number){
    return this.http.delete(address + "contactscontactperson/" + id);
  }



  getOffice(id: number){
    return this.http.get<Office>(address + 'office/' + id);
  }

  editStatusVacancy(id: number){
    return this.http.put(address + 'vacancy/' + id + '/status', null);
  }

  getContactTypes(){
    return this.http.get<ContactType[]>(address + "contacttype/all");
  }

  getFieldsOfActivity(){
    return this.http.get<FieldOfActivity[]>(address + "fieldofactivity/all");
  }



}
