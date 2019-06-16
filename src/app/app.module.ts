import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

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
import {BarMenuComponent} from './bar-menu/bar-menu.component';
import {HomePageComponent} from './home-page/home-page.component';
import {AutorizationComponent} from './autorization/autorization.component';
import {
  DeleteOfficeDialog,
  DeleteVacancyDialog,
  StatisticVacancyDialog,
  ProfileComponent,
  DeleteContactPersonDialog,
  DeleteContactDialog,
  DeleteSpecificationDialog,
  DeleteEventDialog
} from './profile/profile.component';
import {
  DeleteBookApplicantDialog,
  DeleteContactApplicantDialog,
  DeleteEducationDialog,
  DeleteExperienceDialog,
  DeleteLanguageSkillDialog,
  DeleteSpecializationDialog,
  DeleteSportSkillDialog
} from "./profile-user/profile-user.component";
import {VacancyCardComponent} from './vacancy-card/vacancy-card.component';
import {VacancyComponent} from './vacancy/vacancy.component';
import {VacanciesComponent} from './vacancies/vacancies.component';
import {EmployerComponent} from './employer/employer.component';
import {OfficeCardComponent} from './office-card/office-card.component';
import {httpInterceptorProviders} from "./auth/auth-interceptor";
import {ProfileUserComponent} from './profile-user/profile-user.component';
import {UsersComponent} from './users/users.component';
import {UserCardComponent} from './user-card/user-card.component';
import {UserComponent} from './user/user.component';
import {BookmarksComponent} from './bookmarks/bookmarks.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {
  InfoCompanyApplicantDialog,
  ProfileAdminComponent
} from './profile-admin/profile-admin.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyCardComponent } from './company-card/company-card.component';
import { EventCardComponent } from './event-card/event-card.component';
import { EventComponent } from './event/event.component';

const routs = [
  {path: '', component: HomePageComponent},
  {path: 'authorization', component: AutorizationComponent},
  {path: 'company_profile', component: ProfileComponent},
  {path: 'user_profile', component: ProfileUserComponent},
  {path: 'admin_profile', component: ProfileAdminComponent},
  {path: 'vacancy/:id', component: VacancyComponent},
  {path: 'vacancy/:id/employer/:id', redirectTo: 'employer/:id', pathMatch: 'full'},
  {path: 'vacancies', component: VacanciesComponent},
  {path: 'vacancies/vacancy/:id', redirectTo: 'vacancy/:id', pathMatch: 'full'},
  {path: 'employer/:id', component: EmployerComponent},
  {path: 'employer/:id/vacancy/:id', redirectTo: 'vacancy/:id', pathMatch: 'full'},
  {path: 'applicant/:id', component: UserComponent},
  {path: 'applicants', component: UsersComponent},
  {path: 'applicants/applicant/:id', redirectTo: 'applicant/:id', pathMatch: 'full'},
  {path: 'companies', component: CompaniesComponent},
  {path: 'companies/employer/:id', redirectTo: 'employer/:id', pathMatch: 'full'},
  {path: 'bookmarks', component: BookmarksComponent},
  {path: 'bookmarks/vacancy/:id', redirectTo: 'vacancy/:id', pathMatch: 'full'},
  {path: 'notifications', component: NotificationsComponent},
  {path: 'notifications/applicant/:id', redirectTo: 'applicant/:id', pathMatch: 'full'},
  {path: 'notifications/vacancy/:id', redirectTo: 'vacancy/:id', pathMatch: 'full'},
  {path: 'event/:id', component: EventComponent},
  {path: 'event/:id/employer/:id', redirectTo: 'employer/:id', pathMatch: 'full'},
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
    StatisticVacancyDialog,
    DeleteContactPersonDialog,
    DeleteContactDialog,
    DeleteSpecificationDialog,
    DeleteLanguageSkillDialog,
    DeleteExperienceDialog,
    DeleteSportSkillDialog,
    DeleteContactApplicantDialog,
    DeleteBookApplicantDialog,
    DeleteSpecializationDialog,
    DeleteEducationDialog,
    DeleteEventDialog,
    InfoCompanyApplicantDialog,
    VacancyCardComponent,
    VacancyComponent,
    VacanciesComponent,
    EmployerComponent,
    OfficeCardComponent,
    ProfileUserComponent,
    UsersComponent,
    UserCardComponent,
    UserComponent,
    BookmarksComponent,
    NotificationsComponent,
    ProfileAdminComponent,
    CompaniesComponent,
    CompanyCardComponent,
    EventCardComponent,
    EventComponent
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
    StatisticVacancyDialog,
    DeleteContactPersonDialog,
    DeleteContactDialog,
    DeleteSpecificationDialog,
    DeleteLanguageSkillDialog,
    DeleteExperienceDialog,
    DeleteSportSkillDialog,
    DeleteContactApplicantDialog,
    DeleteBookApplicantDialog,
    DeleteSpecializationDialog,
    DeleteEducationDialog,
    DeleteEventDialog,
    InfoCompanyApplicantDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
