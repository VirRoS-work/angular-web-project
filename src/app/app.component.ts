import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  getNormalDateTime(date: Date): string {

    date = new Date(date.toString());

    return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " в " + date.getHours() + ":" + date.getMinutes();
  }

  }
