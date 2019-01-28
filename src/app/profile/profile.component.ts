import {Component, OnInit, Inject, ViewChild, ElementRef} from '@angular/core';
import {DataService} from "../data.service";
import {FormControl, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';

import {Office} from "../Office";
import {Employer} from "../Employer";
import {ContactPerson} from "../ContactPerson";
import {ContactType} from "../../ContactType";
import {Vacancy} from "../Vacancy";
import {FieldOfActivity} from "../FieldOfActivity";

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

  @ViewChild('city_office') cityOffice: ElementRef;

  displayedColumns: string[] = ['city', 'address', 'description', 'icon'];
  displayedContactsColumns: string[] = ['type', 'value', 'option'];
  displayedVacancyFieldColumns: string[] = ['field_of_activity', 'specialization', 'option'];

  disableSelect = new FormControl(true);
  disableOfficeSelect = new FormControl(true);
  disableVacancySelect = new FormControl(true);
  disableContactSelect = new FormControl(true);
  disableAddContact = new FormControl(true);
  disableAddSpecialization = new FormControl(true);

  infoNameControl = new FormControl(null, [Validators.required]);

  employer_id = 1;

  pointContactPerson = 0;
  pointVacancy = 0;

  employer$: Object;
  types$: Object;
  types_employment$: Object;
  count$: Object;
  offices$: Object;
  vacancies$: Vacancy[];
  contacts_person$: ContactPerson[];
  contact_types$: ContactType[];
  field_of_activity$: FieldOfActivity[];

  office = new Office(null, null, null);
  employer = new Employer(null, null, null, null, null, null, null, null);
  contactPerson = new ContactPerson(null, null, null, null);
  vacancy = new Vacancy(null, null, null, null, null, null,
    null, null, new Office(null, null, null, null), null);

  page_info = true;
  page_contact = false;
  page_offices = false;
  page_vacancies = false;
  page_settings = false;

  fnameControl = new FormControl('', [Validators.required]);
  lnameControl = new FormControl('', [Validators.required]);

  cityControl = new FormControl('', [Validators.required]);
  addressControl = new FormControl('', [Validators.required]);

  contactTypeControl = new FormControl('', [Validators.required]);
  contactValueControl = new FormControl('', [Validators.required]);

  specializationTypeControl = new FormControl('', [Validators.required]);
  specializationValueControl = new FormControl('', [Validators.required]);

  vacancyTitleControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  vacancyDescriptionControl = new FormControl('', [Validators.required]);

  constructor(private data: DataService, public dialog: MatDialog) {
  }

  ngOnInit() {

    this.data.getEmployer(this.employer_id).subscribe(
      data => {
        this.employer$ = data;
        this.employer = data;
      }
    );

    this.data.getTypesEmployer().subscribe(
      data => this.types$ = data
    );

    this.data.getCountEmployees().subscribe(
      data => this.count$ = data
    );

    this.data.getCompanyOffices(this.employer_id).subscribe(
      data => this.offices$ = data
    );

    this.data.getTypesEmployment().subscribe(
      data => this.types_employment$ = data
    );

    this.data.getCompanyVacancies(this.employer_id).subscribe(
      data => this.vacancies$ = data
    );

    this.data.getCompanyContactPersons(this.employer_id).subscribe(
      data => this.contacts_person$ = data
    );

    this.data.getContactTypes().subscribe(
      data => this.contact_types$ = data
    );

    this.data.getFieldsOfActivity().subscribe(
      data => this.field_of_activity$ = data
    );

  }

  // Info methods

  clearInfo() {
    this.disableSelect.setValue(true);

    console.log(this.employer);
  }

  editInfo(name: String, type: String, number_of_person: String, address: String, site: String, description: String) {

    if (this.infoNameControl) {

      if (site == "") site = null;
      if (address == "") address = null;
      if (description == "") description = null;

      const body = {
        "id": this.employer_id,
        "name": name,
        "type": type,
        "number_of_person": "От 50 до 250",
        "address": address,
        "site": site,
        "description": description
      };

      console.log(body);

      this.data.regEmployer(body).subscribe(
        data => {
          this.data.getEmployer(this.employer_id).subscribe(
            data => {
              this.employer$ = data;
              this.employer = data;
            }
          );
        }
      );

      this.clearInfo();

    }
  }

  // Office methods

  saveOffice(city: String, address: String, description: String) {

    if (this.office.id == null) {
      this.addOffice(city, address, description);
    } else {
      this.editOffice(this.office.id, city, address, description);
    }

  }

  addOffice(city: String, address: String, description: String) {

    if (this.cityControl.valid && this.addressControl.valid) {
      if (description.trim().length == 0) description = null;

      const body = {
        "city": city,
        "address": address,
        "description": description,
        "employer": {
          "id": this.employer_id
        }
      }

      console.log(body);

      this.data.regOffice(body).subscribe(
        data => this.data.getCompanyOffices(this.employer_id).subscribe(
          data => this.offices$ = data
        )
      );

      this.clearOffice();

    }
  }

  editOffice(id: number, city: String, address: String, description: String) {

    if (this.cityControl.valid && this.addressControl.valid) {
      if (description.trim().length == 0) description = null;

      const body = {
        "id": id,
        "city": city,
        "address": address,
        "description": description,
        "employer": {
          "id": this.employer_id
        }
      };

      console.log(body);

      this.data.regOffice(body).subscribe(
        data => this.data.getCompanyOffices(this.employer_id).subscribe(
          data => this.offices$ = data
        )
      );

      this.clearOffice();

    }

  }

  clearOffice() {

    this.cityControl.reset();
    this.addressControl.reset();

    this.disableOfficeSelect.setValue(true);

    this.office = new Office(null, null, null);
  }

  editOfficeDialog(element: Office) {

    this.disableOfficeSelect.setValue(false);
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

    this.data.delOffice(id).subscribe(
      data => this.data.getCompanyOffices(this.employer_id).subscribe(
        data => this.offices$ = data
      )
    );
  }

  // Contact methods

  saveContactPerson(fname: String, lname: String, faname: String) {

    if (this.contactPerson.id == null) {
      this.addContactPerson(fname, lname, faname);
    } else {
      this.editContactPerson(this.contactPerson.id, fname, lname, faname);
    }

  }

  addContactPerson(fname: String, lname: String, faname: String) {

    if (this.fnameControl.valid && this.lnameControl.valid) {

      const body = {
        "first_name": fname,
        "last_name": lname,
        "father_name": faname,
        "employer": {
          "id": this.employer_id
        }
      };

      this.data.regContactPerson(body).subscribe(
        data => {
          this.data.getCompanyContactPersons(this.employer_id).subscribe(
            data => this.contacts_person$ = data
          );
        }
      );

      this.clearContactPerson();
    }
  }

  editContactPerson(id: number, fname: String, lname: String, faname: String) {

    if (this.fnameControl.valid && this.lnameControl.valid) {

      const body = {
        "id": id,
        "first_name": fname,
        "last_name": lname,
        "father_name": faname,
        "employer": {
          "id": this.employer_id
        }
      };

      this.data.regContactPerson(body).subscribe(
        data => {
          this.data.getCompanyContactPersons(this.employer_id).subscribe(
            data => this.contacts_person$ = data
          );
        }
      );

      this.clearContactPerson();
    }

  }

  clearContactPerson() {
    this.fnameControl.reset();
    this.lnameControl.reset();

    this.disableContactSelect.setValue(true);
    this.contactPerson = new ContactPerson(null, null, null, null);
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

    this.data.delContactPerson(id).subscribe(
      data => {
        this.data.getCompanyContactPersons(this.employer_id).subscribe(
          data => this.contacts_person$ = data
        );
      }
    );
  }

  openEditContactPersonDialog(element: ContactPerson) {

    this.contactPerson = new ContactPerson(element.first_name, element.last_name, element.father_name, element.contacts, element.id);
    this.disableContactSelect.setValue(false);

    this.setPointContactPerson(0);

  }

  createContact(id: number, value: string, contact_person_id: number) {

    if (this.contactTypeControl.valid && this.contactValueControl.valid) {
      const body = {
        "contact_type": {
          "id": id
        },
        "contact_person": {
          "id": contact_person_id
        },
        "value": value
      };

      this.data.addContactByContactPerson(body).subscribe(
        data => {
          this.data.getCompanyContactPersons(this.employer_id).subscribe(
            data => this.contacts_person$ = data
          );
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

    this.data.delContactByContactPerson(id).subscribe(
      data => {
        this.data.getCompanyContactPersons(this.employer_id).subscribe(
          data => this.contacts_person$ = data
        );
      }
    );

  }

  clearContact(): void {
    this.disableAddContact.setValue(true);

    this.contactTypeControl.reset();
    this.contactValueControl.reset();
  }

  // Vacancy methods

  saveVacancy(title: String, description: String, min_salary: number, max_salary: number, type_employment: String,
              remove_work: number, experience_min: number, office_id: number) {

    if (this.vacancy.id == null) {
      this.addVacancy(title, description, min_salary, max_salary, type_employment, remove_work, experience_min, office_id);
    } else {
      this.editVacancy(this.vacancy.id, this.vacancy.status, title, description, min_salary, max_salary, type_employment,
        remove_work, experience_min, office_id);
    }

  }

  addVacancy(title: String, description: String, min_salary: number, max_salary: number, type_employment: String,
             remove_work: number, experience_min: number, office_id: number) {

    if (this.vacancyTitleControl.valid && this.vacancyDescriptionControl.valid) {

      const body = {
        "status": "Неактивна",
        "title": title,
        "description": description,
        "salary_min": (min_salary == 0) ? null : min_salary,
        "salary_max": (max_salary == 0) ? null : max_salary,
        "remove_work": (remove_work != undefined) ? remove_work : null,
        "type_employment": (type_employment != undefined) ? type_employment : null,
        "experience_min": (experience_min == 0) ? null : experience_min,
        "employer": {
          "id": this.employer_id
        },
        "office": {
          "id": "" == office_id.toString() ? null : office_id
        }
      };

      this.data.regVacancy(body).subscribe(
        data => this.data.getCompanyVacancies(this.employer_id).subscribe(
          data => this.vacancies$ = data
        )
      );

      this.clearVacancy();
    }
  }

  editVacancy(id: number, status: String, title: String, description: String, min_salary: number, max_salary: number, type_employment: String,
              remove_work: number, experience_min: number, office_id: number) {

    if (this.vacancyTitleControl.valid && this.vacancyDescriptionControl.valid) {

      const body = {
        "id": id,
        "status": status,
        "title": title,
        "description": description,
        "salary_min": (min_salary == 0) ? null : min_salary,
        "salary_max": (max_salary == 0) ? null : max_salary,
        "remove_work": (remove_work != undefined) ? remove_work : null,
        "type_employment": (type_employment != undefined) ? type_employment : null,
        "experience_min": (experience_min == 0) ? null : experience_min,
        "employer": {
          "id": this.employer_id
        },
        "office": {
          "id": "" == office_id.toString() ? null : office_id
        }
      };

      this.data.regVacancy(body).subscribe(
        data => this.data.getCompanyVacancies(this.employer_id).subscribe(
          data => this.vacancies$ = data
        )
      );

      this.clearVacancy();

      this.setPointVacancy(id);
    }

  }

  openEditVacancyDialog(vacancy: Vacancy): void {

    this.vacancy = vacancy;

    this.setPointVacancy(0);
    this.disableVacancySelect.setValue(false);

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

    this.data.delVacancy(id).subscribe(
      data => this.data.getCompanyVacancies(this.employer_id).subscribe(
        data => this.vacancies$ = data
      )
    );
  }

  openNewVacancyDialog(){
    this.disableVacancySelect.setValue(false);
    this.setPointVacancy(0);

    this.vacancy = new Vacancy(null, null, null, null, null, null,
      null, null, new Office(null, null, null, null), null);
  }

  editStatusVacancy(id: number) {

    this.data.editStatusVacancy(id).subscribe(
      data => this.data.getCompanyVacancies(this.employer_id).subscribe(
        data => this.vacancies$ = data
      )
    )
  }

  createSpecialization(id: number, value: string, vacancy_id: number): void {

    if (this.specializationValueControl.valid && this.specializationTypeControl) {

      const body = {
        "field_of_activity": {
          "id": id
        },
        "vacancy": {
          "id": vacancy_id
        },
        "specialization": value
      };

      this.data.addSpecializationByVacancy(body).subscribe(
        data => {
          this.data.getCompanyVacancies(this.employer_id).subscribe(
            data => this.vacancies$ = data
          );
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

    this.data.delSpecializationByVacancy(id).subscribe(
      data => {
        this.data.getCompanyVacancies(this.employer_id).subscribe(
          data => this.vacancies$ = data
        );
      }
    );
  }

  clearSpecialization(): void {
    this.specializationTypeControl.reset();
    this.specializationValueControl.reset();

    this.disableAddSpecialization.setValue(true);
  }

  setPointVacancy(index: number) {
    this.pointVacancy = index;
    this.clearSpecialization();
  }


  backInfo() {
    this.disableSelect.setValue(false)
  }

  clearVacancy() {

    this.vacancyTitleControl.reset();
    this.vacancyDescriptionControl.reset();

    this.disableVacancySelect.setValue(true);
  }

  click_menu(id: number) {
    switch (id) {
      case 1:
        this.page_info = true;
        this.page_contact = false;
        this.page_offices = false;
        this.page_vacancies = false;
        this.page_settings = false;
        this.disableOfficeSelect.setValue(true);
        break;
      case 2:
        this.page_info = false;
        this.page_contact = true;
        this.page_offices = false;
        this.page_vacancies = false;
        this.page_settings = false;
        this.disableSelect.setValue(true);
        break;
      case 3:
        this.page_info = false;
        this.page_contact = false;
        this.page_offices = true;
        this.page_vacancies = false;
        this.page_settings = false;
        this.disableSelect.setValue(true);
        break;
      case 4:
        this.page_info = false;
        this.page_contact = false;
        this.page_offices = false;
        this.page_vacancies = true;
        this.page_settings = false;
        this.disableSelect.setValue(true);
        this.disableOfficeSelect.setValue(true);
        break;
      case 5:
        this.page_info = false;
        this.page_contact = false;
        this.page_offices = false;
        this.page_vacancies = false;
        this.page_settings = true;
        this.disableSelect.setValue(true);
        this.disableOfficeSelect.setValue(true);
        break;
    }
    ;

    this.setPointContactPerson(0);
    this.setPointVacancy(0)
    this.clearContactPerson();
    this.clearVacancy();

  }

  setPointContactPerson(index: number) {
    this.pointContactPerson = index;
    this.clearContact();
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
