import {Component, Inject, OnInit} from '@angular/core';
import {TokenStorageService} from "../auth/token-storage.service";
import {Language} from "../model/Language";
import {InfoService} from "../sevices/info.service";
import {FormControl, Validators} from "@angular/forms";
import {Observable} from "rxjs/internal/Observable";
import {map, startWith} from 'rxjs/operators';
import {LanguageSkill} from "../model/LanguageSkill";
import {Applicant} from "../model/Applicant";
import {UserService} from "../sevices/user.service";
import {DeleteContactPersonDialog, DialogData} from "../profile/profile.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {SportSkill} from "../model/SportSkill";
import {Sport} from "../model/Sport";
import {Experience} from "../model/Experience";
import {Education} from "../model/Education";
import {ContactApplicant} from "../model/ContactApplicant";
import {ContactType} from "../model/ContactType";
import {FieldOfActivity} from "../model/FieldOfActivity";
import {SpecializationApplicant} from "../model/SpecializationApplicant";
import {ApplicantInfo} from "../model/ApplicantInfo";
import {Book} from "../model/Book";

export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {

  //constants
  applicant$: Applicant;
  languages$: Language[];
  sports$: Sport[];
  formstraining$: string[];
  familyStatus$: string[];
  contacttypes$: ContactType[];
  fieldsOfActivities$: FieldOfActivity[];
  educations$: string[] = ["Высшее", "Неоконченное высшее", "Среднее специальное", "Среднее"];

  //disable
  disableAddLanguageSkill = new FormControl(true);
  disableErrorLanguageName = new FormControl(true);
  disableAddSportSkill = new FormControl(true);
  disableAddExperience = new FormControl(true);
  disableAddEducation = new FormControl(true);
  disableAddContact = new FormControl(true);
  disableAddSpecialization = new FormControl(true);
  disableAddBook = new FormControl(true);

  //display page content
  pageProfile = true;
  pageInformation = false;
  pageLanguage = false;
  pageSpecialization = false;
  pageSports = false;
  pageExperience = false;
  pageEducation = false;
  pageBooks = false;

  //experience controls
  experienceCompanyNameControl = new FormControl('', [Validators.required]);
  experiencePositionControl = new FormControl('', [Validators.required]);
  experienceDateStartControl = new FormControl('', [Validators.required]);
  //education controls
  educationInstitutionControl = new FormControl('', [Validators.required]);
  educationFacultyControl = new FormControl('', [Validators.required]);
  educationSpecializationControl = new FormControl('', [Validators.required]);
  educationDateStartControl = new FormControl('', [Validators.required]);
  educationLevelControl = new FormControl('', [Validators.required]);
  educationFormTrainingControl = new FormControl('', [Validators.required]);
  //languages controls
  languageNameControl = new FormControl('', [Validators.required]);
  languageSkillControl = new FormControl('', [Validators.required]);
  //sports controls
  sportNameControl = new FormControl('', [Validators.required]);
  sportSkillControl = new FormControl('', [Validators.required]);
  //books controls
  bookAuthorControl = new FormControl('', [Validators.required]);
  bookNameControl = new FormControl('', [Validators.required]);
  //specialization controls
  specializationFieldControl = new FormControl('', [Validators.required]);
  specializationDescriptionControl = new FormControl('', [Validators.required]);
  //controls contacts
  contactTypeControl = new FormControl('', [Validators.required]);
  contactValueControl = new FormControl('', [Validators.required]);

  //varibles
  applicant: Applicant = new Applicant(null, null, null, null, null);
  languageSkills: LanguageSkill[];
  filteredLanguages: Observable<Language[]>;
  sportSkills: SportSkill[];
  experiences: Experience[];
  books: Book[];
  specializations: SpecializationApplicant[];
  experience: Experience = new Experience(null, null, null,
    null, null, null);
  educations: Education[];
  education: Education = new Education(null, null, null, null,
    null, null, null);
  contacts: ContactApplicant[];
  information: ApplicantInfo = new ApplicantInfo(null, null, null, null,
    null, null, null, null, null, null);
  statusSuccessSwitch = false;
  informationSuccessSave = false;

  // Display Columns
  displayedColumnsForLanguages: string[] = ['name', 'skill', 'icon'];
  displayedColumnsForSports: string[] = ['name', 'skill', 'icon'];
  displayedColumnsForSpecializations: string[] = ['name', 'skill', 'icon'];
  displayedColumnsForBooks: string[] = ['author', 'name', 'icon'];

  //points
  pointExperience = 0;
  pointEducation = 0;

  // Display Columns
  disableInfo = new FormControl(true);
  displayedColumnsForContact: string[] = ['type', 'value', 'option'];

  constructor(private tokenStorage: TokenStorageService, private info: InfoService, private us: UserService,
              public dialog: MatDialog) {
  }

  ngOnInit() {

    if (this.tokenStorage.getToken() && "USER" === this.tokenStorage.getAuthority()) {

      this.info.getLanguages().subscribe(
        data => this.languages$ = data
      );

      this.info.getSports().subscribe(
        data => this.sports$ = data
      );

      this.info.getFormsTraining().subscribe(
        data => this.formstraining$ = data
      );

      this.info.getContactTypes().subscribe(
        data => this.contacttypes$ = data
      );

      this.info.getFieldsOfActivities().subscribe(
        data => this.fieldsOfActivities$ = data
      );

      this.info.getFamilyStatus().subscribe(
        data => this.familyStatus$ = data
      );

      this.us.getApplicantForAccount().subscribe(
        data => {
          this.applicant$ = data;
          this.applicant = data;
          this.languageSkills = data.language_skills;
          this.sportSkills = data.sport_skills;
          this.experiences = data.experiences;
          this.educations = data.educations;
          this.contacts = data.contacts;
          this.specializations = data.specializations;
          this.information = data.info;
          this.books = data.books;
        }
      );

      this.filteredLanguages = this.languageNameControl.valueChanges.pipe(
        startWith<string | Language>(''),
        map(value => typeof value === 'string' ? value : (value != null) ? value.name : ''),
        map(name => name ? this._filter(name) : this.languages$.slice())
      );

    } else {
      window.location.replace("");
    }
  }

  // Menu methods

  click_menu(id: number) {
    switch (id) {
      case 1:
        this.clearPageContent();
        this.pageProfile = true;
        break;
      case 2:
        this.clearPageContent();
        this.pageInformation = true;
        break;
      case 3:
        this.clearPageContent();
        this.pageEducation = true;
        break;
      case 4:
        this.clearPageContent();
        this.pageExperience = true;
        break;
      case 5:
        this.clearPageContent();
        this.pageSpecialization = true;
        break;
      case 6:
        this.clearPageContent();
        this.pageLanguage = true;
        break;
      case 7:
        this.clearPageContent();
        this.pageSports = true;
        break;
      case 8:
        this.clearPageContent();
        this.pageBooks = true;
        break;
    }

    this.clearLanguagePage();
    this.clearSportSkillPage();
    this.clearExperiencePage();
    this.clearEducationPage();
    this.clearProfilePage();
    this.clearSpecializationPage();
    this.clearInformationPage();
  }

  clearPageContent() {
    this.pageProfile = false;
    this.pageInformation = false;
    this.pageSpecialization = false;
    this.pageLanguage = false;
    this.pageSports = false;
    this.pageExperience = false;
    this.pageEducation = false;
    this.pageBooks = false;
  }

  clearProfilePage(): void {
    this.clearInfoUser();
    this.clearContacts();
  }

  // Info about user

  switchStatus(): void {
    this.us.switchStatusToAccount().subscribe(
      data => {
        this.statusSuccessSwitch = true;
        this.applicant$ = data;
        this.applicant = data;
      }
    );
  }

  saveInfo(first_name: string, last_name: string, father_name: string, sex: boolean, birthday: string): void {

    this.us.saveApplicantForAccount(new Applicant(first_name, last_name, father_name, sex, new Date(birthday))).subscribe(
      data => {
        this.applicant$ = data;
        this.applicant = data;
      }
    );

    this.clearInfoUser();

  }

  clearInfoUser(): void {
    this.statusSuccessSwitch = false;
    this.disableInfo.setValue(true);
    this.applicant = this.applicant$;
  }

  // Information

  saveInformation(ready_to_move: boolean, ready_for_remove_work: boolean, city: string, citizenship: string,
                  family_status: string, children: boolean, about_me: string, hobby: string, salary: number,
                  academic_degree: string): void {

    this.us.saveInformationAboutAccount(new ApplicantInfo(ready_to_move, ready_for_remove_work, city, citizenship, family_status,
      children, about_me, hobby, salary, academic_degree)).subscribe(
        data => {
          this.information = data;

          this.informationSuccessSave = true;
        }
    );

  }

  clearInformation(): void{
    this.informationSuccessSave = false;
  }

  clearInformationPage(): void {
    this.clearInformation();
  }

  // Language methods

  saveLanguageSkill(language: string, skill: string) {

    this.disableErrorLanguageName.setValue(true);

    if (this.languageNameControl.valid && this.languageSkillControl.valid) {

      if (this.languages$.some(e => e.name === language)) {

        this.us.saveLanguageSkillForAccount(new LanguageSkill(new Language(language), skill)).subscribe(
          data => {
            this.us.getLanguageSkillsForAccount().subscribe(
              data => this.languageSkills = data
            )
          }
        );

        this.clearLanguageSkill();

      } else {
        console.log("!!!!");
        this.disableErrorLanguageName.setValue(false);
      }
    }
  }

  openDeleteLanguageSkillDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteLanguageSkillDialog, {
      width: '250px',
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) this.deleteLanguageSkill(result);
    });
  }

  deleteLanguageSkill(id: number) {

    this.us.deleteLanguageSkillForAccount(id).subscribe(
      data => {
        this.us.getLanguageSkillsForAccount().subscribe(
          data => this.languageSkills = data
        )
      }
    );
  }

  clearLanguageSkill() {
    this.languageNameControl.reset();
    this.languageSkillControl.reset();

    this.disableAddLanguageSkill.setValue(true);
    this.disableErrorLanguageName.setValue(true);
  }

  clearLanguagePage() {
    this.clearLanguageSkill();
  }

  displayFn(language?: Language): string | undefined {
    return language ? language.name : undefined;
  }

  private _filter(name: string): Language[] {
    const filterValue = name.toLowerCase();

    return this.languages$.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  // Sport methods

  saveSportSkill(sport: string, skill: string) {

    if (this.sportSkillControl.valid && this.sportNameControl.valid) {

      this.us.saveSportSkillForAccount(new SportSkill(new Sport(sport), skill)).subscribe(
        data => {
          this.us.getSportSkillsForAccount().subscribe(
            data => this.sportSkills = data
          )
        }
      );

      this.clearSportSkill();
    }
  }

  clearSportSkill(): void {
    this.sportNameControl.reset();
    this.sportSkillControl.reset();

    this.disableAddSportSkill.setValue(true);
  }

  openDeleteSportSkillDialog(id: number) {
    const dialogRef = this.dialog.open(DeleteSportSkillDialog, {
      width: '250px',
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) this.deleteSportSkill(result)
    })
  }

  deleteSportSkill(id: number) {

    this.us.deleteSportSkillForAccount(id).subscribe(
      data => {
        this.us.getSportSkillsForAccount().subscribe(
          data => this.sportSkills = data
        )
      }
    )
  }

  clearSportSkillPage(): void {
    this.clearSportSkill();
  }

  // Specialization methods

  saveSpecialization(id_field: number, specialization: string){

    if(this.specializationFieldControl.valid && this.specializationDescriptionControl.valid){

      this.us.saveSpecializationForAccount(new SpecializationApplicant(
        new FieldOfActivity(null, id_field), specialization
      )).subscribe(
        data => this.us.getSpecializationForAccount().subscribe(
          data => this.specializations = data
        )
      );

      this.clearSpecialization();
    }
  }

  clearSpecialization() {
    this.specializationFieldControl.reset();
    this.specializationDescriptionControl.reset();

    this.disableAddSpecialization.setValue(true);
  }

  openDeleteSpecializationDialog(id: number) {
    const dialogRef = this.dialog.open(DeleteSpecializationDialog, {
      width: '250px',
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) this.deleteSpecialization(result)
    })
  }

  deleteSpecialization(id: number){
    this.us.deleteSpecializationForAccount(id).subscribe(
      data => {
        this.us.getSpecializationForAccount().subscribe(
          data => this.specializations = data
        )
      }
    )
  }

  clearSpecializationPage() {
    this.clearSpecialization();
  }

  // Experience methods

  setPointExperience(id: number): void {
    this.pointExperience = id;
  }

  saveExperience(company_name: string, position: string, date_start: Date, date_end: Date, duties: string,
                 achievements: string): void {

    if (this.experienceCompanyNameControl.valid && this.experiencePositionControl.valid &&
      this.experienceDateStartControl.valid) {

      if (duties == "") duties = null;
      if (achievements == "") achievements = null;

      this.us.saveExperienceForAccount(
        new Experience(company_name, position, new Date(date_start), new Date(date_end), duties, achievements, this.experience.id)
      ).subscribe(
        data => {
          this.us.getExperiencesForAccount().subscribe(
            data => this.experiences = data
          );

          this.clearExperience();

          this.experience = new Experience(null, null, null,
            null, null, null);


        }
      );
    }
  }

  openEditExperienceDialog(element: Experience): void {
    this.experience = element;
    this.disableAddExperience.setValue(false);

    this.setPointExperience(0);
  }

  openDeleteExperienceDialog(id: number): void {

    const dialogRef = this.dialog.open(DeleteExperienceDialog, {
      width: '250px',
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) this.deleteExperience(result);
    });
  }

  deleteExperience(id: number) {

    this.us.deleteExperienceForAccount(id).subscribe(
      data => {
        this.setPointExperience(0);

        this.us.getExperiencesForAccount().subscribe(
          data => this.experiences = data
        );
      }
    );
  }

  clearExperience(): void {
    this.experienceCompanyNameControl.reset();
    this.experiencePositionControl.reset();
    this.experienceDateStartControl.reset();

    this.disableAddExperience.setValue(true);
  }

  clearExperiencePage(): void {
    this.clearExperience();

    this.setPointExperience(0);
  }

  // Education methods

  setPointEducation(id: number): void {
    this.pointEducation = id;
  }

  saveEducation(institution: string, faculty: string, specialization: string, date_start: string, date_end: string,
                level: string, form: string): void {

    if (this.educationInstitutionControl.valid && this.educationFacultyControl.valid &&
      this.educationSpecializationControl.valid && this.educationDateStartControl.valid &&
      this.educationFormTrainingControl.valid) {

      this.us.saveEducationForAccount(new Education(institution, faculty, specialization, new Date(date_start),
        new Date(date_end), this.education.level_education, this.education.form_training, this.education.id)).subscribe(
        data => {

          this.us.getEducationsForAccount().subscribe(
            data => this.educations = data
          );

          this.setPointEducation(data.id);

          this.clearEducation();

          this.education = new Education(null, null, null, null,
            null, null, null);
        }
      )
    }

  }

  openEditEducationDialog(element: Education): void {
    this.education = element;
    this.disableAddEducation.setValue(false);

    this.setPointEducation(0);

    console.log(this.education);
  }

  openDeleteEducationDialog(id: number): void {

    const dialogRef = this.dialog.open(DeleteExperienceDialog, {
      width: '250px',
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) this.deleteEducation(result);
    });
  }

  deleteEducation(id: number): void {

    this.us.deleteEducationForAccount(id).subscribe(
      data => {
        this.setPointEducation(0);

        this.us.getEducationsForAccount().subscribe(
          data => this.educations = data
        );
      }
    );
  }

  clearEducation(): void {
    this.educationInstitutionControl.reset();
    this.educationFacultyControl.reset();
    this.educationSpecializationControl.reset();
    this.educationDateStartControl.reset();
    this.educationFormTrainingControl.reset();
    this.educationLevelControl.reset();

    this.education = new Education(null, null, null, null,
      null, null, null);

    this.disableAddEducation.setValue(true);
  }

  clearEducationPage(): void {
    this.clearEducation();

    this.setPointEducation(0);
  }

  // Contact methods

  saveContact(contact_type: string, contact_value: string): void {

    if (this.contactTypeControl.valid && this.contactValueControl.valid) {

      this.us.saveContactForAccount(new ContactApplicant(new ContactType(contact_type), contact_value)).subscribe(
        data => {
          this.us.getContactForAccount().subscribe(
            data => this.contacts = data
          );

          this.clearContacts();
        }
      )
    }
  }

  openDeleteContactDialog(id: number): void {

    const dialogRef = this.dialog.open(DeleteContactApplicantDialog, {
      width: '250px',
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) this.deleteContact(result);
    });
  }

  deleteContact(id: number): void {

    this.us.deleteContactForAccount(id).subscribe(
      data => {
        this.us.getContactForAccount().subscribe(
          data => this.contacts = data
        );
      }
    );
  }

  clearContacts(): void {
    this.contactTypeControl.reset();
    this.contactValueControl.reset();

    this.disableAddContact.setValue(true);
  }

  // Book methods

  saveBook(author: string, name: string) {

    if (this.bookAuthorControl.valid && this.bookNameControl.valid) {

      this.us.saveBookForAccount(new Book(author, name)).subscribe(
        data => {
          this.us.getBooksForAccount().subscribe(
            data => this.books = data
          )
        }
      );

      this.clearBooks();
    }
  }

  openDeleteBookDialog(id: number): void {

    const dialogRef = this.dialog.open(DeleteBookApplicantDialog, {
      width: '250px',
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) this.deleteBook(result);
    });
  }

  deleteBook(id: number): void {

    this.us.deleteBookForAccount(id).subscribe(
      data => {
        this.us.getBooksForAccount().subscribe(
          data => this.books = data
        );
      }
    );
  }

  clearBooks(): void {
    this.bookAuthorControl.reset();
    this.bookNameControl.reset();

    this.disableAddBook.setValue(true);
  }

  // Summary method

  openPDF() {

    this.us.downloadPDF().subscribe(x => {

      var newBlob = new Blob([x], { type: "application/pdf" });

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      }

      const data = window.URL.createObjectURL(newBlob);

      var link = document.createElement('a');
      link.href = data;
      link.download = "Резюме.pdf";

      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

      setTimeout(function () {
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
    });
  }
}


@Component({
  selector: 'delete-language-skill-dialog',
  templateUrl: 'delete-language-skill-dialog.html',
  styleUrls: ['./profile-user.component.css']
})
export class DeleteLanguageSkillDialog {

  constructor(
    public dialogRef: MatDialogRef<DeleteLanguageSkillDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'delete-sport-skill-dialog',
  templateUrl: 'delete-sport-skill-dialog.html',
  styleUrls: ['./profile-user.component.css']
})
export class DeleteSportSkillDialog {

  constructor(
    public dialogRef: MatDialogRef<DeleteSportSkillDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'delete-experience-dialog',
  templateUrl: 'delete-experience-dialog.html',
  styleUrls: ['./profile-user.component.css']
})
export class DeleteExperienceDialog {

  constructor(
    public dialogRef: MatDialogRef<DeleteExperienceDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'delete-education-dialog',
  templateUrl: 'delete-education-dialog.html',
  styleUrls: ['./profile-user.component.css']
})
export class DeleteEducationDialog {

  constructor(
    public dialogRef: MatDialogRef<DeleteEducationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'delete-contact-dialog',
  templateUrl: 'delete-contact-dialog.html',
  styleUrls: ['./profile-user.component.css']
})
export class DeleteContactApplicantDialog {

  constructor(
    public dialogRef: MatDialogRef<DeleteContactApplicantDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'delete-book-dialog',
  templateUrl: 'delete-book-dialog.html',
  styleUrls: ['./profile-user.component.css']
})
export class DeleteBookApplicantDialog {

  constructor(
    public dialogRef: MatDialogRef<DeleteBookApplicantDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'delete-specialization-dialog',
  templateUrl: 'delete-specialization-dialog.html',
  styleUrls: ['./profile-user.component.css']
})
export class DeleteSpecializationDialog {

  constructor(
    public dialogRef: MatDialogRef<DeleteSpecializationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
