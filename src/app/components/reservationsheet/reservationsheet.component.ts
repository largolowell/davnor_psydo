import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservationsheet',
  templateUrl: './reservationsheet.component.html',
  styleUrls: ['./reservationsheet.component.css']
})
export class ReservationsheetComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  printThisPage(){
    window.print();
  }

}
