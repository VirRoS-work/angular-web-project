import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {AuthService} from "../sevices/auth.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {AuthLoginInfo} from "../auth/login-info";
import {MatRadioChange} from "@angular/material";
import {SignUpCompanyInfo} from "../auth/signupcompany-info";
import {InfoService} from "../sevices/info.service";
import {SignUpApplicantInfo} from "../auth/signupapplicant-info";
import {SignUpInfo} from "../auth/signup-info";

@Component({
  selector: 'app-autorization',
  templateUrl: './autorization.component.html',
  styleUrls: ['./autorization.component.css']
})
export class AutorizationComponent implements OnInit {

  isLoggedIn = false;
  isLoginFailed = false;
  isRegistrationUserFailed = false;
  isRegistrationUserSuccess = false;
  isRegistrationFailed = false;
  isRegistrationSuccess = false;
  errorMessage = '';

  roles: string[] = [];
  private loginInfo: AuthLoginInfo;
  private signUpCompanyInfo: SignUpCompanyInfo;
  private signUpApplicantInfo: SignUpApplicantInfo;

  //login control
  loginAutoControl = new FormControl('', [Validators.required]);
  passwordAutoControl = new FormControl('', [Validators.required]);

  //signUp control
  loginControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  mailControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  password2Control = new FormControl('', [Validators.required]);

  //user control
  loginUserControl = new FormControl('',
    [Validators.required, Validators.minLength(6), Validators.maxLength(50)]);
  mailUserControl = new FormControl('', [Validators.required]);
  passwordUserControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  password2UserControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  //user info control
  userFirstNameControl = new FormControl('', [Validators.required]);
  userLastNameControl = new FormControl('', [Validators.required]);
  userSexControl = new FormControl('', [Validators.required]);
  userDateOfBirthdayControl = new FormControl('', [Validators.required]);

  //company control
  companyNameControl = new FormControl('',
    [Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
  companyTypeControl = new FormControl('', Validators.required);
  companyCountControl = new FormControl('', Validators.required);
  companyAddressControl = new FormControl('', Validators.maxLength(250));
  companySiteControl = new FormControl('', Validators.maxLength(250));

  hide = true;
  hide2 = true;
  hideUserPassword = true;
  hideUserPassword2 = true;
  $companyTypes: string[];
  $companyCounts: string[];

  constructor(private router: Router, private info: InfoService,
              private authService: AuthService, private tokenStorage: TokenStorageService) {
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      window.location.replace("");
    }

    this.info.getTypesEmployer().subscribe(
      data => this.$companyTypes = data
    );

    this.info.getCountsEmployer().subscribe(
      data => this.$companyCounts = data
    );
  }

  loginEmployer(login: string, password: string) {

    if (this.loginAutoControl.valid && this.passwordAutoControl.valid) {

      this.loginInfo = new AuthLoginInfo(login, password);

      this.authService.attemptAuth(this.loginInfo).subscribe(
        data => {

          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUsername(data.username);
          this.tokenStorage.saveAuthorities(data.authorities);

          this.isLoggedIn = true;
          this.isLoginFailed = false;

          this.roles = this.tokenStorage.getAuthorities();

          this.reloadPage();
        },
        error => {
          console.log(error);

          this.isLoginFailed = true;
          this.errorMessage = error.error.message;
        }
      );
    }
  }


  registrationCompany(login: string, password: string, email: string,
                      name: string, type: string, count: string, address: string,
                      site: string, description: string) {

    if (this.loginControl.valid && this.mailControl.valid && this.passwordControl.valid
      && this.password2Control && this.companyNameControl.valid && this.companyTypeControl.valid
      && this.companyCountControl.valid && this.companyAddressControl.valid && this.companySiteControl.valid) {

      this.signUpCompanyInfo = new SignUpCompanyInfo(login, password, email,
        name, type, count, address, site, description);

      this.authService.signUpCompany(this.signUpCompanyInfo).subscribe(
        data => {
          window.location.reload();
          this.isRegistrationSuccess = true;
        },
        error => {
          console.log(error);

          this.isRegistrationFailed = true;
          this.errorMessage = error.error.message;
        }
      );
    }
  }

  registrationUser(login: string, password: string, email: string,
                   first_name: string, last_name: string, father_name: string, sex: boolean, date_of_birthday: string){

    if(this.loginUserControl.valid && this.mailUserControl.valid && this.passwordUserControl.valid
      && this.password2UserControl.valid && this.userFirstNameControl.valid && this.userLastNameControl.valid
    && this.userSexControl.valid && this.userDateOfBirthdayControl.valid)
    {
      this.signUpApplicantInfo = new SignUpApplicantInfo(login, password, email,
        first_name, last_name, father_name, sex, new Date(date_of_birthday)
      );

      console.log(this.signUpApplicantInfo);

      this.authService.signUpApplicant(this.signUpApplicantInfo). subscribe(
        data => {
          window.location.reload();
          this.isRegistrationUserSuccess = true;
        },
        error => {
          console.log(error);

          this.isRegistrationUserFailed = true;
          this.errorMessage = error.error.message;
        }
      )
    }
  }

  reloadPage() {
    window.location.replace("");
  }

}
