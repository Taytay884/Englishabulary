import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements AfterViewInit {
  isDrawerOpened = false;
  @ViewChild('drawer') drawer: ElementRef<MatDrawer> | undefined;

  ngAfterViewInit() {
    (this.drawer as any).openedStart.subscribe(() => {
      this.isDrawerOpened = true;
    });
  }

  toggleDrawer() {
    (this.drawer! as any).toggle();
  }

  setIsDrawerOpened(isOpened: boolean) {
    if (!isOpened) {
      this.isDrawerOpened = isOpened;
    }
  }
}
