import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-office-card',
  templateUrl: './office-card.component.html',
  styleUrls: ['./office-card.component.css']
})
export class OfficeCardComponent implements OnInit {

  @Input() city: String;
  @Input() address: String;
  @Input() description: String;

  constructor() { }

  ngOnInit() {
  }

}
