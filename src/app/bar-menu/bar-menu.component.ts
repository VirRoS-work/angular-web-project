import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../auth/token-storage.service";

@Component({
  selector: 'app-bar-menu',
  templateUrl: './bar-menu.component.html',
  styleUrls: ['./bar-menu.component.css']
})
export class BarMenuComponent implements OnInit {

  username: string;
  authority: string;

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if(this.tokenStorage.getToken()) {
      this.username = this.tokenStorage.getUsername();
      this.authority = this.tokenStorage.getAuthority();
    }
  }

  logOut() {
    this.tokenStorage.signOut();
    window.location.replace("");
  }

}
