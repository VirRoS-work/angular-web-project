import {ChangeDetectorRef, Component, OnInit, Inject, ViewChild, ElementRef} from '@angular/core';
import {DataService} from "../data.service";
import {FormControl, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  id: number;
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('city_office') cityOffice: ElementRef;

  displayedColumns: string[] = ['city', 'address', 'description', 'icon'];

  disableSelect = new FormControl(true);
  disableOfficeSelect = new FormControl(true);

  employer_id = 1;

  employer$: Object;
  types$: Object;
  count$: Object;
  offices$: Object;


  page_info = true;
  page_offices = false;
  page_vacancies = false;
  page_settings = false;


  cityControl = new FormControl('', [Validators.required]);
  addressControl = new FormControl('', [Validators.required]);


  constructor(private data: DataService, private ref: ChangeDetectorRef, public dialog: MatDialog) {
  }

  ngOnInit() {

    this.data.getEmployer(this.employer_id).subscribe(
      data => this.employer$ = data
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

  }

  openDeleteOfficeDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteOfficeDialog, {
      width: '250px',
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.deleteOffice(result);
    });
  }

  deleteOffice(id: number) {

    this.data.delOffice(id).subscribe(
      data => this.data.getCompanyOffices(this.employer_id).subscribe(
        data => this.offices$ = data
      )
    );
  }

  addOffice(city: String, address: String, description: String){

    if (this.cityControl.valid && this.addressControl.valid) {
      if (description = "") description = null;

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

      this.disableOfficeSelect.setValue(true);

    }
  }

  clearOffice() {
    this.cityOffice.nativeElement.value = '';

    this.disableOfficeSelect.setValue(true);
  }

  click_menu(id: number) {
    switch (id) {
      case 1:
        this.page_info = true;
        this.page_offices = false;
        this.page_vacancies = false;
        this.page_settings = false;
        break;
      case 2:
        this.page_info = false;
        this.page_offices = true;
        this.page_vacancies = false;
        this.page_settings = false;
        this.disableSelect.setValue(true);
        break;
      case 3:
        this.page_info = false;
        this.page_offices = false;
        this.page_vacancies = true;
        this.page_settings = false;
        this.disableSelect.setValue(true);
        break;
      case 4:
        this.page_info = false;
        this.page_offices = false;
        this.page_vacancies = false;
        this.page_settings = true;
        this.disableSelect.setValue(true);
        break;
    }
    ;
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
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
