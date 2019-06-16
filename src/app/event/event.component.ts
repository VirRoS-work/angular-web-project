import { Component, OnInit } from '@angular/core';
import {Event} from "../model/Event";
import {Employer} from "../model/Employer";
import {TokenStorageService} from "../auth/token-storage.service";
import {ContentService} from "../sevices/content.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css', '../css/base.css']
})
export class EventComponent implements OnInit {

  event$: Event = new Event(null, null, null, null, null, null);
  employer$: Employer = new Employer(null, null, null, null, null, null);

  show = false;

  constructor(private route: ActivatedRoute, private content: ContentService,
              private tokenStorage: TokenStorageService) {
    this.route.params.subscribe(params => this.event$.id = params.id);
  }

  ngOnInit() {

    this.content.getEventById(this.event$.id).subscribe(
      data => {
        this.event$ = data.event;
        this.content.getCompanyById(data.employer_id).subscribe(
          data => {
            this.employer$ = data;
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
