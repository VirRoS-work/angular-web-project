import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import { HttpClientModule }    from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule
} from '@angular/material';
import { BarMenuComponent } from './bar-menu/bar-menu.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AutorizationComponent } from './autorization/autorization.component';
import {
  DeleteOfficeDialog,
  DeleteVacancyDialog,
  ProfileComponent,
  DeleteContactPersonDialog,
  DeleteContactDialog,
  DeleteSpecificationDialog
} from './profile/profile.component';
import {
  DeleteContactApplicantDialog,
  DeleteEducationDialog,
  DeleteExperienceDialog,
  DeleteLanguageSkillDialog, DeleteSpecializationDialog,
  DeleteSportSkillDialog
} from "./profile-user/profile-user.component";
import { VacancyCardComponent } from './vacancy-card/vacancy-card.component';
import { VacancyComponent } from './vacancy/vacancy.component';
import { VacanciesComponent } from './vacancies/vacancies.component';
import { EmployerComponent } from './employer/employer.component';
import { OfficeCardComponent } from './office-card/office-card.component';
import { httpInterceptorProviders } from "./auth/auth-interceptor";
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { UsersComponent } from './users/users.component';
import { UserCardComponent } from './user-card/user-card.component';
import { UserComponent } from './user/user.component';

const routs = [
  {path: '', component: HomePageComponent},
  {path: 'autorization', component: AutorizationComponent},
  {path: 'company_profile', component: ProfileComponent},
  {path: 'user_profile', component:ProfileUserComponent},
  {path: 'vacancy/:id', component: VacancyComponent},
  // {path: 'vacancies', component: VacanciesComponent},
  {path: 'employer/:id', component: EmployerComponent},
  {path: 'employer/:id/vacancy/:id', redirectTo: 'vacancy/:id', pathMatch: 'full' },
  {path: 'applicant/:id', component: UserComponent},
  {path: 'applicants', component: UsersComponent},
  {path: 'applicants/applicant/:id', redirectTo: 'applicant/:id', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    BarMenuComponent,
    HomePageComponent,
    AutorizationComponent,
    ProfileComponent,
    DeleteOfficeDialog,
    DeleteVacancyDialog,
    DeleteContactPersonDialog,
    DeleteContactDialog,
    DeleteSpecificationDialog,
    DeleteLanguageSkillDialog,
    DeleteExperienceDialog,
    DeleteSportSkillDialog,
    DeleteContactApplicantDialog,
    DeleteSpecializationDialog,
    DeleteEducationDialog,
    VacancyCardComponent,
    VacancyComponent,
    VacanciesComponent,
    EmployerComponent,
    OfficeCardComponent,
    ProfileUserComponent,
    UsersComponent,
    UserCardComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routs),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule
  ],
  providers: [httpInterceptorProviders],
  entryComponents: [
    ProfileComponent,
    DeleteOfficeDialog,
    DeleteVacancyDialog,
    DeleteContactPersonDialog,
    DeleteContactDialog,
    DeleteSpecificationDialog,
    DeleteLanguageSkillDialog,
    DeleteExperienceDialog,
    DeleteSportSkillDialog,
    DeleteContactApplicantDialog,
    DeleteSpecializationDialog,
    DeleteEducationDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
