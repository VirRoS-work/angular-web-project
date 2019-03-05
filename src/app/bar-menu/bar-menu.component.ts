import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../auth/token-storage.service";
import {EmployerService} from "../sevices/employer.service";

@Component({
  selector: 'app-bar-menu',
  templateUrl: './bar-menu.component.html',
  styleUrls: ['./bar-menu.component.css']
})
export class BarMenuComponent implements OnInit {

  username: string;
  authority: string;

  notification: number;

  constructor(private tokenStorage: TokenStorageService, private empl: EmployerService) { }

  ngOnInit() {
    if(this.tokenStorage.getToken()) {
      this.username = this.tokenStorage.getUsername();
      this.authority = this.tokenStorage.getAuthority();
    }

    if(this.authority === "COMPANY") {
      this.empl.chechNewNotificationForAccount().subscribe(
        data => {
          this.notification = Number(data);
          if(this.notification == 0) this.notification = undefined;
        }
      );
    }
  }

  logOut() {
    this.tokenStorage.signOut();
    window.location.replace("");
  }

}
