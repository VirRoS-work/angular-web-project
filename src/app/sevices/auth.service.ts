import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtResponse } from '../auth/jwt-response';
import { AuthLoginInfo } from '../auth/login-info';
import {SignUpCompanyInfo} from "../auth/signupcompany-info";
import {SignUpApplicantInfo} from "../auth/signupapplicant-info";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8080/api/auth/signin';
  private signUpCompanyUrl = 'http://localhost:8080/api/auth/signupcompany';
  private signUpApplicantUrl = 'http://localhost:8080/api/auth/signupapplicant';

  constructor(private http: HttpClient) {
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  signUpCompany(info: SignUpCompanyInfo): Observable<string> {
    return this.http.post(this.signUpCompanyUrl, info,
      { headers: { 'Content-Type': 'application/json' }, responseType: 'text'});
  }

  signUpApplicant(info: SignUpApplicantInfo): Observable<string> {
    return this.http.post(this.signUpApplicantUrl, info,
      { headers: { 'Content-Type': 'application/json' }, responseType: 'text'});
  }



}
