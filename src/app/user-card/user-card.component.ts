import {Component, Input, OnInit} from '@angular/core';
import {Applicant} from "../model/Applicant";
import {SpecializationApplicant} from "../model/SpecializationApplicant";
import {el} from "@angular/platform-browser/testing/src/browser_util";

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

  getSpecializationList(): string {

    let list1 = new Set();
    let str = "";

    for(let spec of this.user.specializations) {
      list1.add(spec.field_of_activity.name);
    }

    list1.forEach(function (data) {
      if(str == "") str = data;
      else str += ', ' + data;
    });

    return str;
  }

  getExperience(): string {

    if(this.user.experiences.length > 0) return "Имеется";
    else return "Отсутствует";

  }
}
