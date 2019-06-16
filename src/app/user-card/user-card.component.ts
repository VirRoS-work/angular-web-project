import {Component, Input, OnInit} from '@angular/core';
import {Applicant} from "../model/Applicant";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input() user: Applicant;

  constructor() { }

  ngOnInit() {
  }

}
