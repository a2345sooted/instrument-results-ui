import { Component, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';

import { NAV_ITEMS } from '../../core/nav/nav-items';

@Component({
  selector: 'app-nav-menu',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './nav-menu.html',
  styleUrl: './nav-menu.scss',
})
export class NavMenu {
  readonly navItems = NAV_ITEMS;

  @ViewChild(MatMenuTrigger)
  private readonly menuTrigger?: MatMenuTrigger;

  constructor(private readonly breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe('(min-width: 769px)')
      .subscribe(result => {
        if (result.matches) {
          this.menuTrigger?.closeMenu();
        }
      });
  }
}
