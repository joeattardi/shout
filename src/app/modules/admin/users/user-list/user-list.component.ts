import { Component, EventEmitter, Input, Output } from '@angular/core';

import { faExclamationTriangle, faToolbox, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { User } from '../../../core/core.types';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  icons = {
    admin: faToolbox,
    delete: faTrashAlt,
    error: faExclamationTriangle
  };

  @Input() users: User[];
  @Input() loading = false;
  @Input() error = false;

  @Output() retry = new EventEmitter<void>();

  onRetry(): void {
    this.retry.emit();
  }
}
