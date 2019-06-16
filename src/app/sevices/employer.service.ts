import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employer} from "../model/Employer";
import {Contact} from "../model/Contact";
import {ContactPerson} from "../model/ContactPerson";
import {Office} from "../model/Office";
import {Vacancy} from "../model/Vacancy";
import {SpecializationVacancy} from "../model/SpecializationVacancy";
import {Notification} from "../model/Notification";
import {StatisticVacancy} from "../model/StatisticVacancy";
import {Event} from "../model/Event";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EmployerService {
  private host = 'http://localhost:8080/api/employer';

  constructor(private http: HttpClient) { }

  getEmployerForAccount(): Observable<Employer> {
    return this.http.get<Employer>(this.host + "/info");
  }

  editEmployerForAccount(employer: Employer) {
    return this.http.post(this.host + "/edit", employer, httpOptions);
  }

  getContactPersonForAccount(): Observable<ContactPerson[]> {
    return this.http.get<ContactPerson[]>(this.host + "/contacts");
  }

  saveContactPersonToAccount(person: ContactPerson): Observable<ContactPerson>{
    return this.http.post<ContactPerson>(this.host + "/contact", person, httpOptions);
  }

  deleteContactPersonFromAccount(id: number) {
    return this.http.delete(this.host + "/contact/" + id, {responseType: 'text'} );
  }

  addContactToContactPerson(contact: Contact) {
    return this.http.post(this.host + "/contactperson/contact", contact, httpOptions);
  }

  deleteContactFromContactPerson(id: number) {
    return this.http.delete(this.host + "/contactperson/contact/" + id, {responseType: 'text'} );
  }

  getOfficesFromAccount(): Observable<Office[]> {
    return this.http.get<Office[]>(this.host + "/offices");
  }

  saveOfficeToAccount(office: Office): Observable<Office> {
    return this.http.post<Office>(this.host + "/office", office, httpOptions);
  }

  deleteOfficeToAccount(id: number) {
    return this.http.delete(this.host + "/office/" + id, {responseType: 'text'});
  }

  getVacanciesFromAccount(): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(this.host + "/vacancies");
  }

  saveVacancyToAccount(vacancy: Vacancy): Observable<Vacancy> {
    return this.http.post<Vacancy>(this.host + "/vacancy", vacancy, httpOptions);
  }

  deleteVacancyFromAccount(id: number) {
    return this.http.delete(this.host + "/vacancy/" + id, {responseType: 'text'});
  }

  saveSpecializationToVacancy(specialization: SpecializationVacancy): Observable<SpecializationVacancy> {
    return this.http.post<SpecializationVacancy>(this.host + "/vacancy/specialization", specialization, httpOptions);
  }

  deleteSpecializationsFromVacancy(id: number) {
    return this.http.delete(this.host + "/vacancy/specialization/" + id, {responseType: 'text'});
  }

  editStatusToVacancy(id: number) {
    return this.http.put(this.host + "/vacancy/status", id, httpOptions);
  }

  getStatisticToVacancy(id: number): Observable<StatisticVacancy> {
    return this.http.get<StatisticVacancy>(this.host + "/vacancy/statistic/" + id);
  }

  // Notifications

  getNotificationsForAccount(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.host + "/notifications");
  }

  chechNewNotificationForAccount() {
    return this.http.get(this.host + "/notifications/new", {responseType: 'text'});
  }

  updateStatusForNewNotifications() {
    return this.http.put(this.host + "/notifications/see", null, {responseType: 'text'});
  }

  // Events

  getEventsForAccount(): Observable<Event[]> {
    return this.http.get<Event[]>(this.host + "/events", httpOptions);
  }

  saveEventForAccount(event: Event): Observable<Event> {
    return this.http.post<Event>(this.host + "/event", event, httpOptions);
  }

  deleteEventFromAccount(id: number) {
    return this.http.delete(this.host + "/event/" + id, {responseType: 'text'});
  }

  // Private Summary

  downloadPrivatePDF(id: number): Observable<Blob> {
    return this.http.get(this.host + "/private_summary/" + id, {responseType: 'blob'});
  }

}
