import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ContentService} from "../sevices/content.service";
import {Applicant} from "../model/Applicant";
import {ApplicantInfo} from "../model/ApplicantInfo";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userNotFoundError = false;
  user$: Applicant = new Applicant(null, null, null, null, null);

  // Display Columns
  displayedColumnsForLanguages: string[] = ['name', 'skill'];

  constructor(private route: ActivatedRoute, private content: ContentService) {
    this.route.params.subscribe(
      params => this.user$.id = params.id
    );
  }

  ngOnInit() {

    this.content.getUserById(this.user$.id).subscribe(
      data => this.user$ = data,
      error => this.userNotFoundError = true
    );
  }

  dowloadPDF(id: number) {

    this.content.downloadPDF(id).subscribe(
      x => {

        var newBlob = new Blob([x], { type: "application/pdf" });

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(newBlob);
          return;
        }

        const data = window.URL.createObjectURL(newBlob);

        var link = document.createElement('a');
        link.href = data;
        link.download = this.user$.last_name + ".pdf";

        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

        setTimeout(function () {
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
      }
    );
  }

  getNormalDate(date: Date): string {

    if(date == null) return null;

    date = new Date(date);

    return date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear();
  }

}
