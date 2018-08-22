import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import { HttpClientModule }    from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatTabsModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatSelectModule,
  MatGridListModule,
  MatListModule
} from '@angular/material';
import { BarMenuComponent } from './bar-menu/bar-menu.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AutorizationComponent } from './autorization/autorization.component';
import { ProfileComponent } from './profile/profile.component';

const routs = [
  {path: '', component: HomePageComponent},
  {path: 'autorization', component: AutorizationComponent},
  {path: 'my_profile', component: ProfileComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    BarMenuComponent,
    HomePageComponent,
    AutorizationComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routs),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
