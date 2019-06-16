import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Vacancy} from "../model/Vacancy";
import {ContentService} from "../sevices/content.service";
import {Employer} from "../model/Employer";
import {TokenStorageService} from "../auth/token-storage.service";
import {UserService} from "../sevices/user.service";

@Component({
  selector: 'app-vacancy',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.css', '../css/base.css']
})
export class VacancyComponent implements OnInit {

  vacancy$: Vacancy = new Vacancy(null, null, null, null, null,
    null, null, null, null, null);
  employer$: Employer = new Employer(null, null, null, null, null, null);
  show = false;
  authority: string;
  bookmarkFlag: boolean = false;
  notificationFlag: boolean = false;

  constructor(private route: ActivatedRoute, private content: ContentService,
              private tokenStorage: TokenStorageService, private user: UserService) {
    this.route.params.subscribe(params => this.vacancy$.id = params.id);
  }

  ngOnInit() {

    if(this.tokenStorage.getToken()) {
      this.authority = this.tokenStorage.getAuthority();
    }

    if(this.authority === 'USER') {
      this.user.checkBookmark(this.vacancy$.id).subscribe(
        data => {
          if (data === "true") this.bookmarkFlag = true;
        }
      );

      this.user.checkNotification(this.vacancy$.id).subscribe(
        data => {
          if (data === "true") this.notificationFlag = true;
        }
      );
    }

    this.content.getVacancyById(this.vacancy$.id).subscribe(
      data => {
        this.vacancy$ = data;

        this.content.getEmployerByVacancyId(this.vacancy$.id).subscribe(
          data => this.employer$ = data
        );
      }
    );
  }

  saveBookmark(id: number){
      this.user.saveBookmark(id).subscribe(
        data => {
          this.user.checkBookmark(this.vacancy$.id).subscribe(
            data => {
              if (data === "true") this.bookmarkFlag = true;
              else this.bookmarkFlag = false;
            }
          );
        }
      );
  }

  deleteBookmark(id: number) {
    this.user.deleteBookmarkForAccount(id).subscribe(
      data => {
        this.user.checkBookmark(this.vacancy$.id).subscribe(
          data => {
            if (data === "true") this.bookmarkFlag = true;
            else this.bookmarkFlag = false;
          }
        );
      }
    );
  }

  saveNotification(id: number){
    this.user.saveNotification(id).subscribe(
      data => {
        this.user.checkNotification(this.vacancy$.id).subscribe(
          data => {
            if (data === "true") this.notificationFlag = true;
            else this.notificationFlag = false;
          }
        );
      }
    );
  }

  getNormalDateTime(date: Date): string {

    date = new Date(date);

    return date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear() + " в " + date.getHours() + ":"
      + ((date.getMinutes() == 0) ? "00" : date.getMinutes());
  }

}
