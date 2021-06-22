import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  links = ['Study', 'My Words', 'Preferences'];
  activeLink = this.links[0];
  constructor() {}

  ngOnInit(): void {}
}
