import {Component, Input, OnInit} from '@angular/core';
import {VacancyMessage} from "../model/filters/responce/VacancyMessage";

@Component({
  selector: 'app-vacancy-card',
  templateUrl: './vacancy-card.component.html',
  styleUrls: ['./vacancy-card.component.css', '../css/base.css']
})
export class VacancyCardComponent implements OnInit {

  @Input() vacancy: VacancyMessage;

  constructor() { }

  ngOnInit() {
  }

}
