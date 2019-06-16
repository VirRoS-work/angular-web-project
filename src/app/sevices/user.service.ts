import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/internal/Observable";
import {Applicant} from "../model/Applicant";
import {LanguageSkill} from "../model/LanguageSkill";
import {SportSkill} from "../model/SportSkill";
import {Experience} from "../model/Experience";
import {Education} from "../model/Education";
import {ContactApplicant} from "../model/ContactApplicant";
import {SpecializationApplicant} from "../model/SpecializationApplicant";
import {ApplicantInfo} from "../model/ApplicantInfo";
import {Vacancy} from "../model/Vacancy";
import {Book} from "../model/Book";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private host = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) { }

  getApplicantForAccount(): Observable<Applicant> {
    return this.http.get<Applicant>(this.host + "/info");
  }

  saveApplicantForAccount(applicant: Applicant): Observable<Applicant> {
    return this.http.post<Applicant>(this.host + "/info", applicant, httpOptions);
  }

  switchStatusToAccount(): Observable<Applicant> {
    return this.http.put<Applicant>(this.host + "/status",null);
  }

  // languages

  saveLanguageSkillForAccount(languageSkill: LanguageSkill): Observable<LanguageSkill> {
    return this.http.post<LanguageSkill>(this.host + "/language", languageSkill, httpOptions);
  }

  deleteLanguageSkillForAccount(id: number) {
    return this.http.delete(this.host + "/language/" + id, {responseType: 'text'});
  }

  getLanguageSkillsForAccount(): Observable<LanguageSkill[]> {
    return this.http.get<LanguageSkill[]>(this.host + "/languages");
  }

  // sports

  saveSportSkillForAccount(sportSkill: SportSkill): Observable<SportSkill> {
    return this.http.post<SportSkill>(this.host + "/sport", sportSkill, httpOptions);
  }

  deleteSportSkillForAccount(id: number) {
    return this.http.delete(this.host + "/sport/" + id, {responseType: 'text'});
  }

  getSportSkillsForAccount(): Observable<SportSkill[]> {
    return this.http.get<SportSkill[]>(this.host + "/sports");
  }

  //specializations

  saveSpecializationForAccount(specialization: SpecializationApplicant): Observable<SpecializationApplicant> {
    return this.http.post<SpecializationApplicant>(this.host + "/specialization", specialization, httpOptions);
  }

  deleteSpecializationForAccount(id: number) {
    return this.http.delete(this.host + "/specialization/" + id, {responseType: 'text'});
  }

  getSpecializationForAccount(): Observable<SpecializationApplicant[]> {
    return this.http.get<SpecializationApplicant[]>(this.host + "/specializations");
  }

  // experiences

  saveExperienceForAccount(experience: Experience): Observable<Experience> {
    return this.http.post<Experience>(this.host + "/experience", experience, httpOptions);
  }

  deleteExperienceForAccount(id: number) {
    return this.http.delete(this.host + "/experience/" + id, {responseType: 'text'})
  }

  getExperiencesForAccount(): Observable<Experience[]> {
    return this.http.get<Experience[]>(this.host + "/experiences");
  }

  // educations

  saveEducationForAccount(education: Education): Observable<Education> {
    return this.http.post<Education>(this.host + "/education", education, httpOptions);
  }

  deleteEducationForAccount(id: number) {
    return this.http.delete(this.host + "/education/" + id, {responseType: 'text'});
  }

  getEducationsForAccount(): Observable<Education[]> {
    return this.http.get<Education[]>(this.host + "/educations");
  }

  // books

  saveBookForAccount(book: Book): Observable<Book> {
    return this.http.post<Book>(this.host + "/book", book, httpOptions);
  }

  deleteBookForAccount(id: number) {
    return this.http.delete(this.host + "/book/" + id, {responseType: "text"});
  }

  getBooksForAccount(): Observable<Book[]> {
    return this.http.get<Book[]>(this.host + "/books");
  }

  // contacts

  saveContactForAccount(contact: ContactApplicant): Observable<ContactApplicant> {
    return this.http.post<ContactApplicant>(this.host + "/contact", contact, httpOptions);
  }

  deleteContactForAccount(id: number) {
    return this.http.delete(this.host + "/contact/" + id, {responseType: 'text'})
  }

  getContactForAccount(): Observable<ContactApplicant[]> {
    return this.http.get<ContactApplicant[]>(this.host + "/contacts");
  }

  // information

  saveInformationAboutAccount(applicantInfo: ApplicantInfo): Observable<ApplicantInfo> {
    return this.http.post<ApplicantInfo>(this.host + "/information", applicantInfo, httpOptions);
  }

  // summary

  downloadPDF(): Observable<Blob> {
    return this.http.get(this.host + "/summary", {responseType: 'blob'});
  }

  // bookmarks

  getBookmarks(): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(this.host + "/bookmarks");
  }

  deleteBookmarkForAccount(id: number) {
    return this.http.delete(this.host + "/bookmark/" + id, {responseType: 'text'})
  }

  saveBookmark(id: number) {
    return this.http.post(this.host + "/bookmark", id, httpOptions);
  }

  checkBookmark(id: number) {
    return this.http.get(this.host + "/bookmark/check/" + id, {responseType: 'text'})
  }

  // Notifications

  checkNotification(id: number) {
    return this.http.get(this.host + "/notification/check/" + id, {responseType: 'text'})
  }

  saveNotification(id: number) {
    return this.http.post(this.host + "/notification", id, httpOptions);
  }

}
