import { Component, EventEmitter, Input, Output } from '@angular/core';

import { faComments, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import { Room } from '../../../core/core.types';

@Component({
  selector: 'app-admin-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent {
  icons = {
    chat: faComments,
    error: faExclamationTriangle
  };

  @Input() rooms: Room[];
  @Input() loading = false;
  @Input() error = false;

  @Output() retry = new EventEmitter<void>();

  onRetry(): void {
    this.retry.emit();
  }
}
