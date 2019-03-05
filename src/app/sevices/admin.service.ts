import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {AuthLoginInfo} from "../auth/login-info";
import {Employer} from "../model/Employer";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private host = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) { }

  getUsernames(): Observable<string[]> {
    return this.http.get<string[]>(this.host + "/usernames");
  }

  editPasswordForUser(form: AuthLoginInfo) {
    return this.http.put(this.host + "/reset_password", form, { responseType: 'text'});
  }

  getBlockedConpanies(): Observable<Employer[]> {
    return this.http.get<Employer[]>(this.host + "/blocked_companies");
  }

  unlockBlockedCompany(id: number) {
    return this.http.put(this.host + "/company/unlock/" + id, null, {responseType: 'text'});
  }

  blockedCompany(id: number) {
    return this.http.put(this.host + "/company/block/" + id, null, {responseType: 'text'});
  }
}
