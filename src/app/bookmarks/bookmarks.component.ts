import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../auth/token-storage.service";
import {Vacancy} from "../model/Vacancy";
import {UserService} from "../sevices/user.service";

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {

  vacancies: Vacancy[];

  // Display Columns
  displayedColumnsForBookmarks: string[] = ['name', 'see', 'delete'];

  constructor(private tokenStorage: TokenStorageService, private user: UserService) { }

  ngOnInit() {

    if (this.tokenStorage.getToken() && "USER" === this.tokenStorage.getAuthority()) {

      this.user.getBookmarks().subscribe(
        data => this.vacancies = data
      );

    } else {
      window.location.replace("");
    }
  }

  deleteBookmark(id: number){

    this.user.deleteBookmarkForAccount(id).subscribe(
      data => {
        this.user.getBookmarks().subscribe(
          data => this.vacancies = data
        );
      }
    );
  }

}
