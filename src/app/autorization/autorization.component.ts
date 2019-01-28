import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {DataService} from '../data.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-autorization',
  templateUrl: './autorization.component.html',
  styleUrls: ['./autorization.component.css']
})
export class AutorizationComponent implements OnInit {

  nameControl = new FormControl('', [Validators.required]);
  countControl = new FormControl('', [Validators.required]);
  typeControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  loginControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  password2Control = new FormControl('', [Validators.required]);

  loginAutoControl = new FormControl('', [Validators.required]);
  passwordAutoControl = new FormControl('', [Validators.required]);

  hide = true;
  hide2 = true;

  types$: Object;
  count$: Object;

  error_login = true;
  count_login = 0;

  constructor(private data: DataService, private router: Router) {
  }

  ngOnInit() {
    this.data.getTypesEmployer().subscribe(
      data => this.types$ = data
    );

    this.data.getCountEmployees().subscribe(
      data => this.count$ = data
    );
  }

  regCompany(login: String, password: String, name: String, type: String,
             count: String, address: String, site: String, description: String) {

    if (this.loginControl.valid && this.passwordControl.valid && this.nameControl.valid
      && this.typeControl.valid && this.countControl.valid) {

      if (site == "") site = null;
      if (address == "") address = null;
      if (description == "") description = null;

      const body = {
        "login": login,
        "password": password,
        "name": name,
        "type": type,
        "number_of_person": count,
        "address": address,
        "site": site,
        "description": description
      }

      const result = this.data.regEmployer(body).subscribe();

      this.router.navigateByUrl("");

    }
  }

  loginEmployer(login: String, password: String) : boolean{

    if (this.loginAutoControl.valid && this.passwordAutoControl.valid){

      console.log(login + " " + password);
      this.count_login++;

    }

    return this.error_login;

  }

}
