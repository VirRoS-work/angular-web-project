import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {AuthService} from "../sevices/auth.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {AuthLoginInfo} from "../auth/login-info";
import {MatRadioChange} from "@angular/material";
import {SignUpCompanyInfo} from "../auth/signupcompany-info";
import {InfoService} from "../sevices/info.service";

@Component({
  selector: 'app-autorization',
  templateUrl: './autorization.component.html',
  styleUrls: ['./autorization.component.css']
})
export class AutorizationComponent implements OnInit {

  isLoggedIn = false;
  isLoginFailed = false;
  isRegistrationFailed = false;
  isRegistrationSuccess = false;
  errorMessage = '';

  roles: string[] = [];
  private loginInfo: AuthLoginInfo;
  private signUpCompanyInfo: SignUpCompanyInfo;

  userType: string = "user";

  //login control
  loginAutoControl = new FormControl('', [Validators.required]);
  passwordAutoControl = new FormControl('', [Validators.required]);

  //signUp control
  loginControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  mailControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  password2Control = new FormControl('', [Validators.required]);

  //user control

  //company control
  companyNameControl = new FormControl('',
    [Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
  companyTypeControl = new FormControl('', Validators.required);
  companyCountControl = new FormControl('', Validators.required);
  companyAddressControl = new FormControl('', Validators.maxLength(250));
  companySiteControl = new FormControl('', Validators.maxLength(250));

  hide = true;
  hide2 = true;
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


  registrationCompany(login: string, password: string, email: string, role: string,
                      name: string, type: string, count: string, address: string,
                      site: string, description: string) {

    console.log(login, password, email, role, name, type, count, address, site, description);

    if (this.loginControl.valid && this.mailControl.valid && this.passwordControl.valid
      && this.password2Control && this.companyNameControl.valid && this.companyTypeControl.valid
      && this.companyCountControl.valid && this.companyAddressControl.valid && this.companySiteControl.valid) {

      this.signUpCompanyInfo = new SignUpCompanyInfo(login, password, email, [role],
        name, type, count, address, site, description);

      console.log(this.signUpCompanyInfo);

      this.authService.signUp(this.signUpCompanyInfo).subscribe(
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


  reloadPage() {
    window.location.replace("");
  }

  radioChange(event: MatRadioChange) {
    this.userType = event.value;
  }
}
