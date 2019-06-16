import { Component, OnInit } from '@angular/core';
import {Notification} from "../model/Notification";
import {TokenStorageService} from "../auth/token-storage.service";
import {EmployerService} from "../sevices/employer.service";
import {ContentService} from "../sevices/content.service";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications: Notification[];

  // Display Columns
  displayedColumnsForNotifications: string[] = ['applicant', 'vacancy', 'date'];

  constructor(private tokenStorage: TokenStorageService, private empl: EmployerService, private content: ContentService) { }

  ngOnInit() {

    if (this.tokenStorage.getToken() && "COMPANY" === this.tokenStorage.getAuthority()) {

      this.empl.getNotificationsForAccount().subscribe(
        data => {
          this.notifications = data;

          this.empl.updateStatusForNewNotifications().subscribe();
        }
      );

    } else {
      window.location.replace("");
    }

  }

  getNormalDateTime(date: Date): string {

    date = new Date(date);

    return date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear() + " в " + date.getHours() + ":"
      + ((date.getMinutes() == 0) ? "00" : date.getMinutes());
  }

  dowloadPDF(id: number, name: string) {

    this.empl.downloadPrivatePDF(id).subscribe(
      x => {

        var newBlob = new Blob([x], { type: "application/pdf" });

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(newBlob);
          return;
        }

        const data = window.URL.createObjectURL(newBlob);

        var link = document.createElement('a');
        link.href = data;
        link.download = name + ".pdf";

        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

        setTimeout(function () {
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
      }
    );
  }

}
