import { Component, Input, OnInit } from '@angular/core';
import {EventMessage} from "../model/EventMessage";

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {

  @Input() event: EventMessage;

  constructor() { }

  ngOnInit() {
  }

  getNormalDateTime(date: Date): string {

    date = new Date(date);


    return date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear() + " в " + date.getHours() + ":"
      + ((date.getMinutes() == 0) ? "00" : date.getMinutes());
  }

}
