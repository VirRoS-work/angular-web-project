import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AdminService} from "../sevices/admin.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {map, startWith} from "rxjs/operators";
import {Observable} from "rxjs/internal/Observable";
import {AuthLoginInfo} from "../auth/login-info";
import {Employer} from "../model/Employer";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {DialogData} from "../profile/profile.component";

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['../css/base.css', './profile-admin.component.css']
})
export class ProfileAdminComponent implements OnInit {

  // Constants
  usernames$: string[];
  blockedCompanies$: Employer[];

  // Display page content
  pageCompanyApplications = true;
  pagePasswordReset = false;

  // Variables
  filteredUsernames: Observable<string[]>;
  hidePassword = true;
  passwordChangeSuccessfully =false;
  passwordChangeError = false;

  // Display Columns
  displayedColumnsForBlockedCompanies: string[] = ['name', 'options'];

  // Controls
  passwordResetLoginControl = new FormControl('', [Validators.required]);
  passwordResetControl = new FormControl('',
    [Validators.required, Validators.minLength(6)]);

  constructor(private tokenStorage: TokenStorageService, private admin: AdminService,
              public dialog: MatDialog) { }

  ngOnInit() {

    if (this.tokenStorage.getToken() && "ADMIN" === this.tokenStorage.getAuthority()) {

      this.admin.getUsernames().subscribe(data => this.usernames$ = data);
      this.admin.getBlockedConpanies().subscribe(data => this.blockedCompanies$ = data);

      this.filteredUsernames = this.passwordResetLoginControl.valueChanges.pipe(
        startWith<string>(''),
        map(value => typeof value === 'string' ? value : ''),
        map(name => name ? this._filter(name) : this.usernames$.slice())
      );
    } else {
      window.location.replace("");
    }
  }

  // Menu methods

  click_menu(id: number): void{
    switch (id) {
      case 1:
        this.clearPageContent();
        this.pageCompanyApplications = true;
        break;
      case 2:
        this.clearPageContent();
        this.pagePasswordReset = true;
        break;
    }

    this.clearPasswordPage();
  }

  clearPageContent(): void {
    this.pageCompanyApplications = false;
    this.pagePasswordReset = false;
  }

  // Blocked Companies Page

  openInfoDialog(employer: Employer): void {

    const dialogRef = this.dialog.open(InfoCompanyApplicantDialog, {
      width: '400px',
      data: {employer: employer}
    });

  }

  unlockCompany(id: number): void {

    this.admin.unlockBlockedCompany(id).subscribe(
      data => this.admin.getBlockedConpanies().subscribe(data => this.blockedCompanies$ = data)
    );
  }

  blockCompany(id: number): void {

    this.admin.blockedCompany(id).subscribe(
      data => this.admin.getBlockedConpanies().subscribe(data => this.blockedCompanies$ = data)
    );
  }

  // Password Page

  editPasswordForUser(login: string, password: string) {

    if(this.passwordResetLoginControl.valid && this.passwordResetControl.valid){
      this.admin.editPasswordForUser(new AuthLoginInfo(login, password)).subscribe(
        data => this.passwordChangeSuccessfully = true,
        error => this.passwordChangeError = true
      );
    }
  }

  displayFn(username?: string): string | undefined {
    return username ? username : undefined;
  }

  private _filter(name: string): string[] {
    const filterValue = name.toLowerCase();

    return this.usernames$.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  clearPasswordPage(): void {
    this.passwordResetLoginControl.reset();
    this.passwordResetControl.reset();

    this.passwordChangeSuccessfully = false;
    this.passwordChangeError = false;
  }

}


@Component({
  selector: 'info-company-dialog',
  templateUrl: 'info-company-dialog.html',
  styleUrls: ['../css/base.css', './profile-admin.component.css']
})
export class InfoCompanyApplicantDialog {

  constructor(
    public dialogRef: MatDialogRef<InfoCompanyApplicantDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
