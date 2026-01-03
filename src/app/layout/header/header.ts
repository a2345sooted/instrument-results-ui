import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { NAV_ITEMS } from '../../core/nav/nav-items';
import { NavMenu } from '../nav-menu/nav-menu';
import { UserMenu } from '../user-menu/user-menu';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    NavMenu,
    UserMenu,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly navItems = NAV_ITEMS;
}
