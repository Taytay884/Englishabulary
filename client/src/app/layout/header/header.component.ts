import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() menuButtonClicked = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onMenuButtonClicked() {
    this.menuButtonClicked.emit();
  }
}
