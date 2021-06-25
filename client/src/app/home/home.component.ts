import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  units = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  chosenUnit: number = -1;

  constructor() {}

  ngOnInit(): void {}

  onUnitChoose(unit: number) {
    this.chosenUnit = unit;
  }
}
