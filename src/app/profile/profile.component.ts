import {Component, OnInit, Inject, ViewChild, ElementRef} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';

import {TokenStorageService} from "../auth/token-storage.service";
import {EmployerService} from "../sevices/employer.service";
import {Employer} from "../model/Employer";
import {InfoService} from "../sevices/info.service";
import {ContactPerson} from "../model/ContactPerson";
import {ContactType} from "../model/ContactType";
import {Contact} from "../model/Contact";
import {Office} from "../model/Office";
import {FieldOfActivity} from "../model/FieldOfActivity";
import {Vacancy} from "../model/Vacancy";
import {SpecializationVacancy} from "../model/SpecializationVacancy";

export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProfileComponent implements OnInit {

  //display page content
  pageInfo = true;
  pageContact = false;
  pageOffices = false;
  pageVacancies = false;
  pageSettings = false;

  //disabled page content
  disableInfo = new FormControl(true);
  disableAddOffice = new FormControl(true);
  disableAddVacancy = new FormControl(true);
  disableAddContactPerson = new FormControl(true);
  disableAddContact = new FormControl(true);
  disableAddSpecialization = new FormControl(true);

  //const
  employer$: Employer;
  employerTypes$: string[];
  employerCounts$: string[];
  employmentTypes$: string[];
  contactTypes$: ContactType[];
  fieldsOfActivities$: FieldOfActivity[];

  //variable for page
  employer: Employer = new Employer(null, null, null, null, null, null);
  contactPersons: ContactPerson[];
  contactPerson: ContactPerson =  new ContactPerson(null, null, null, null);
  offices: Office[];
  office = new Office(null, null, null);
  vacancies: Vacancy[];
  vacancy: Vacancy = new Vacancy(null, null, null, null, null,
    null, null, null, null, null,null);

  //Controls for Contact Persons
  contactPersonFnameControl = new FormControl('', [Validators.required]);
  contactPersonLnameControl = new FormControl('', [Validators.required]);
  //Controls for Contacts Page
  contactTypeControl = new FormControl('', [Validators.required]);
  contactValueControl = new FormControl('', [Validators.required]);
  //Controls for Offices Page
  officeCityControl = new FormControl('', [Validators.required]);
  officeAddressControl = new FormControl('', [Validators.required]);
  //Controls for Specializations Page
  specializationTypeControl = new FormControl('', [Validators.required]);
  specializationValueControl = new FormControl('', [Validators.required]);
  //Controls for Vacancy Page
  vacancyTitleControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  vacancyDescriptionControl = new FormControl('', [Validators.required]);

  // Points
  pointContactPerson = 0;
  pointVacancy = 0;

  // Display Columns
  displayedColumnsForOffices: string[] = ['city', 'address', 'description', 'icon'];
  displayedColumnsForContact: string[] = ['type', 'value', 'option'];
  displayedColumnsForFields: string[] = ['field_of_activity', 'specialization', 'option'];

  constructor(public dialog: MatDialog, private tokenStorage: TokenStorageService,
              private empl: EmployerService, private info: InfoService) {
  }

  ngOnInit() {

    if (this.tokenStorage.getToken() && "COMPANY" === this.tokenStorage.getAuthority()) {

      this.info.getTypesEmployer().subscribe(
        data => this.employerTypes$ = data
      );

      this.info.getCountsEmployer().subscribe(
        data => this.employerCounts$ = data
      );

      this.info.getContactTypes().subscribe(
        data => this.contactTypes$ = data
      );

      this.info.getFieldsOfActivities().subscribe(
        data => this.fieldsOfActivities$ = data
      );

      this.info.getEmploymentTypes().subscribe(
        data => this.employmentTypes$ = data
      );

      this.empl.getEmployerForAccount().subscribe(
        data => {
          this.employer$ = data;
          this.employer = data;
          this.contactPersons = this.employer.contacts;
          this.offices = this.employer.offices;
          this.vacancies = this.employer.vacancies;
        }
      );

    } else {
      window.location.replace("");
    }
  }

  // Info methods

  clearInfo() {
    this.disableInfo.setValue(true);
  }

  backInfo() {
    this.disableInfo.setValue(false);
  }

  editInfo(name: string, type: string, number_of_person: string, address: string, site: string, description: string) {

    if (site == "") site = null;
    if (address == "") address = null;
    if (description == "") description = null;

    this.empl.editEmployerForAccount(
      new Employer(name, type, number_of_person, address, site, description)).subscribe(
        data => this.clearInfo()
    );

  }

  // Menu methods

  click_menu(id: number) {
    switch (id) {
      case 1:
        this.clearPageContent();
        this.pageInfo = true;
        break;
      case 2:
        this.clearPageContent();
        this.pageContact = true;
        break;
      case 3:
        this.clearPageContent();
        this.pageOffices = true;
        break;
      case 4:
        this.clearPageContent();
        this.pageVacancies = true;
        break;
      case 5:
        this.clearPageContent();
        this.pageSettings = true;
        break;
    }

    this.clearContactPage();
    this.clearOfficePage();
    this.clearVacancyPage();
  }

  clearPageContent() {
    this.pageInfo = false;
    this.pageContact = false;
    this.pageOffices = false;
    this.pageVacancies = false;
    this.pageSettings = false;
  }

  // Contact methods

  setPointContactPerson(index: number) {
    this.pointContactPerson = index;
    this.clearContact();
  }

  saveContactPerson(fname: string, lname: string, faname: string) {

    if (this.contactPersonFnameControl.valid && this.contactPersonLnameControl.valid) {

      if (this.contactPerson.id == null) {
        this.empl.saveContactPersonToAccount(new ContactPerson(
          fname, lname, faname, null
        )).subscribe(
          data =>{
            this.empl.getContactPersonForAccount().subscribe(
              data => this.contactPersons = data
            );

            this.setPointContactPerson(data.id);
          }
        );
      }
      else {
        this.empl.saveContactPersonToAccount(new ContactPerson(
          fname, lname, faname, null, this.contactPerson.id
        )).subscribe(
          data =>{
            this.empl.getContactPersonForAccount().subscribe(
              data => this.contactPersons = data
            );

            this.setPointContactPerson(data.id);
          }
        );
      }

      this.clearContactPerson();
    }
  }

  openEditContactPersonDialog(element: ContactPerson) {

      this.contactPerson = new ContactPerson(element.first_name, element.last_name, element.father_name, element.contacts, element.id);
      this.disableAddContactPerson.setValue(false);

      this.setPointContactPerson(0);

    }

  openDeleteContactPersonDialog(id: number): void {

      const dialogRef = this.dialog.open(DeleteContactPersonDialog, {
        width: '250px',
        data: {id: id}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result != undefined) this.deleteContactPerson(result);
      });
    }

  deleteContactPerson(id: number) {

      this.empl.deleteContactPersonFromAccount(id).subscribe(
        data => {
          this.setPointContactPerson(0);

          this.empl.getContactPersonForAccount().subscribe(
            data => this.contactPersons = data
          );
        }
      );
    }

  createContact(id: number, value: string, contact_person_id: number) {

    if (this.contactTypeControl.valid && this.contactValueControl.valid) {

      this.empl.addContactToContactPerson(new Contact( new ContactPerson(null, null,
        null, null), new ContactType(null, id), value, contact_person_id)).subscribe(
          data => {
            this.empl.getContactPersonForAccount().subscribe(
              data => this.contactPersons = data
            )
          }
      );

      this.clearContact();
    }

  }

  openDeleteContactDialog(id: number): void {

    const dialogRef = this.dialog.open(DeleteContactDialog,
      {
        width: '250px',
        data: {id: id}
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) this.deleteContact(result);
    });

  }

  deleteContact(id: number): void {

    this.empl.deleteContactFromContactPerson(id).subscribe(
      data => {
        this.empl.getContactPersonForAccount().subscribe(
          data => this.contactPersons = data
        );
      }
    );
  }

  clearContactPerson() {
    this.contactPersonFnameControl.reset();
    this.contactPersonLnameControl.reset();

    this.disableAddContactPerson.setValue(true);
    this.contactPerson = new ContactPerson(null, null, null, null);
  }

  clearContact(): void {
    this.disableAddContact.setValue(true);

    this.contactTypeControl.reset();
    this.contactValueControl.reset();
  }

  clearContactPage(): void {
    this.clearContact();
    this.clearContactPerson();
    this.setPointContactPerson(0);
  }

  //Office methods

  clearOffice() {

    this.officeCityControl.reset();
    this.officeAddressControl.reset();

    this.disableAddOffice.setValue(true);

    this.office = new Office(null, null, null, null);
  }

  saveOffice(city: string, address: string, description: string) {

    if(this.officeCityControl.valid && this.officeCityControl.valid){
      if (description.trim().length == 0) description = null;

      if (this.office.id == null) {
        this.empl.saveOfficeToAccount(new Office(city, address, description)).subscribe(
          data => {
            this.empl.getOfficesFromAccount().subscribe(
              data => this.offices = data
            )
          }
        );
      } else {
        this.empl.saveOfficeToAccount(new Office(city, address, description, this.office.id)).subscribe(
          data => {
            this.empl.getOfficesFromAccount().subscribe(
              data => this.offices = data
            )
          }
        );
      }

      this.clearOffice();
    }
  }

  editOfficeDialog(element: Office) {

    this.disableAddOffice.setValue(false);
    this.office = new Office(element.city, element.address, element.description, element.id);

  }

  openDeleteOfficeDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteOfficeDialog, {
      width: '250px',
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) this.deleteOffice(result);
    });
  }

  deleteOffice(id: number) {

    this.empl.deleteOfficeToAccount(id).subscribe(
      data => this.empl.getOfficesFromAccount().subscribe(
        data => this.offices = data
      )
    );
  }

  clearOfficePage(): void {
    this.clearOffice();
  }

  //Vacancy methods

  setPointVacancy(index: number) {
    this.pointVacancy = index;
    this.clearSpecialization();
  }

  openCreateVacancyDialog() {
    this.disableAddVacancy.setValue(false);
    this.setPointVacancy(0);

    this.vacancy = new Vacancy(null, null, null, null, null, null,
      null, null, null, null, null);
  }

  openEditVacancyDialog(vacancy: Vacancy): void {

    this.vacancy = vacancy;

    this.setPointVacancy(0);
    this.disableAddVacancy.setValue(false);

  }

  saveVacancy(title: string, description: string, min_salary: number, max_salary: number, type_employment: string,
              remove_work: boolean, experience_min: number, office_id: number) {

    if (this.vacancyTitleControl.valid && this.vacancyDescriptionControl.valid) {

      if (this.vacancy.id == null) {
        this.empl.saveVacancyToAccount(new Vacancy(
          "Неактивна",
          title,
          description,
          (min_salary == 0) ? null : min_salary,
          (max_salary == 0) ? null : max_salary,
          (remove_work != undefined) ? remove_work : null,
          (type_employment != undefined) ? type_employment : null,
          (experience_min == 0) ? null : experience_min,
          (office_id != null)? new Office(null, null, null, office_id) : null,
          null
        )).subscribe(
          data => {
            this.empl.getVacanciesFromAccount().subscribe(
              data => this.vacancies = data
            );

            this.setPointVacancy(data.id);
          }
        );
      } else {
        this.empl.saveVacancyToAccount(new Vacancy(
          "Неактивна",
          title,
          description,
          (min_salary == 0) ? null : min_salary,
          (max_salary == 0) ? null : max_salary,
          (remove_work != undefined) ? remove_work : null,
          (type_employment != undefined) ? type_employment : null,
          (experience_min == 0) ? null : experience_min,
          (office_id != null)? new Office(null, null, null, office_id) : null,
          null, null, this.vacancy.id
        )).subscribe(
          data => {
            this.empl.getVacanciesFromAccount().subscribe(
              data => this.vacancies = data
            );

            this.setPointVacancy(data.id);
          }
        );
      }

      this.clearVacancy();
    }
  }

  openDeleteVacancyDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteVacancyDialog, {
      width: '250px',
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.deleteVacancy(result);
    });
  }

  deleteVacancy(id: number) {

    this.empl.deleteVacancyFromAccount(id).subscribe(
      data => this.empl.getVacanciesFromAccount().subscribe(
        data => this.vacancies = data
      )
    );
  }

  clearVacancy() {

    this.vacancyTitleControl.reset();
    this.vacancyDescriptionControl.reset();

    this.disableAddVacancy.setValue(true);
  }

  clearSpecialization(): void {
    this.specializationTypeControl.reset();
    this.specializationValueControl.reset();

    this.disableAddSpecialization.setValue(true);
  }

  editStatusVacancy(id: number) {

    this.empl.editStatusToVacancy(id).subscribe(
      data => this.empl.getVacanciesFromAccount().subscribe(
        data => this.vacancies = data
      )
    )
  }

  createSpecialization(id: number, value: string, vacancy_id: number): void {

    if (this.specializationValueControl.valid && this.specializationTypeControl) {

      this.empl.saveSpecializationToVacancy(new SpecializationVacancy(
        null, new FieldOfActivity(null, id), value, vacancy_id)).subscribe(
        data => {
          this.empl.getVacanciesFromAccount().subscribe(
            data => this.vacancies = data
          )
        }
      );

      this.clearSpecialization();
    }
  }

  openDeleteSpecificationDialog(id: number): void {

    const dialogRef = this.dialog.open(DeleteSpecificationDialog,
      {
        width: '250px',
        data: {id: id}
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) this.deleteSpecialization(result);
    });

  }

  deleteSpecialization(id: number): void {

    this.empl.deleteSpecializationsFromVacancy(id).subscribe(
      data => {
        this.empl.getVacanciesFromAccount().subscribe(
          data => this.vacancies = data
        )
      }
    );
  }

  clearVacancyPage(){
    this.clearVacancy();
    this.clearSpecialization();
  }
}


@Component({
  selector: 'delete-office-dialog',
  templateUrl: 'delete-office-dialog.html',
  styleUrls: ['./profile.component.css']
})
export class DeleteOfficeDialog {

  constructor(
    public dialogRef: MatDialogRef<DeleteOfficeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'delete-vacancy-dialog',
  templateUrl: 'delete-vacancy-dialog.html',
  styleUrls: ['./profile.component.css']
})
export class DeleteVacancyDialog {

  constructor(
    public dialogRef: MatDialogRef<DeleteVacancyDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'delete-contact-dialog',
  templateUrl: 'delete-contact-dialog.html',
  styleUrls: ['./profile.component.css']
})
export class DeleteContactPersonDialog {

  constructor(
    public dialogRef: MatDialogRef<DeleteContactPersonDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'delete-cont-dialog',
  templateUrl: 'delete-cont-dialog.html',
  styleUrls: ['./profile.component.css']
})
export class DeleteContactDialog {

  constructor(
    public dialogRef: MatDialogRef<DeleteContactDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'delete-specification-dialog',
  templateUrl: 'delete-specialization-dialog.html',
  styleUrls: ['./profile.component.css']
})
export class DeleteSpecificationDialog {

  constructor(
    public dialogRef: MatDialogRef<DeleteContactDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
