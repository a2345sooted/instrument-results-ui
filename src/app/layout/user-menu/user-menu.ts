import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { ClientIdService } from '../../core/client-id/client-id.service';

@Component({
  selector: 'app-user-menu',
  imports: [MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './user-menu.html',
  styleUrl: './user-menu.scss',
})
export class UserMenu {
  readonly clientId: string;

  constructor(private readonly clientIdService: ClientIdService) {
    this.clientId = this.clientIdService.getClientId();
  }
}
