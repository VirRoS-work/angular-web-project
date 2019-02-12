import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ContactType} from "../model/ContactType";
import {FieldOfActivity} from "../model/FieldOfActivity";

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  private host = 'http://localhost:8080/api/info';

  constructor(private http: HttpClient) { }

  getTypesEmployer(): Observable<string[]> {
    return this.http.get<string[]>(this.host + "/companytypes");
  }

  getCountsEmployer(): Observable<string[]> {
    return this.http.get<string[]>(this.host + "/companycounts");
  }

  getContactTypes(): Observable<ContactType[]> {
    return this.http.get<ContactType[]>(this.host + "/contacttypes");
  }

  getFieldsOfActivities(): Observable<FieldOfActivity[]> {
    return this.http.get<FieldOfActivity[]>(this.host + "/fieldsofactivities");
  }

  getEmploymentTypes(): Observable<string[]> {
    return this.http.get<string[]>(this.host + "/employmenttypes");
  }

}
