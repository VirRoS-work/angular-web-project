import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtResponse } from '../auth/jwt-response';
import { AuthLoginInfo } from '../auth/login-info';
import {SignUpCompanyInfo} from "../auth/signupcompany-info";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8080/api/auth/signin';
  private signUpUrl = 'http://localhost:8080/api/auth/signup';

  constructor(private http: HttpClient) {
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  signUp(info: SignUpCompanyInfo): Observable<string> {
    return this.http.post(this.signUpUrl, info, { headers: { 'Content-Type': 'application/json' }, responseType: 'text'});
  }

}
