import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../auth/token-storage.service";
import {Applicant} from "../model/Applicant";
import {ContentService} from "../sevices/content.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users$: Applicant[];

  constructor(private tokenStorage: TokenStorageService, private content: ContentService) { }

  ngOnInit() {

    if (this.tokenStorage.getToken() && ("COMPANY" === this.tokenStorage.getAuthority() || "ADMIN" === this.tokenStorage.getAuthority())) {

      this.content.getUsers().subscribe(
        data => {
          this.users$ = data;

          console.log(this.users$);
        }
      );
    } else {
      window.location.replace("");
    }
  }

}
