import { Component, EventEmitter, Input, Output } from '@angular/core';

import { faComments } from '@fortawesome/free-solid-svg-icons';

import { Room } from '../../../core/core.types';

@Component({
  selector: 'app-admin-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent {
  icons = {
    chat: faComments
  };

  @Input() rooms: Room[];
  @Input() loading = false;
}
