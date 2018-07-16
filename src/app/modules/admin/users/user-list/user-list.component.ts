import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

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

  @Input() currentUser: User;
  @Input() users: User[];
  @Input() loading = false;
  @Input() error = false;

  @Output() retry = new EventEmitter<void>();
  @Output() delete = new EventEmitter<User>();
  @Output() searchUsers = new EventEmitter<string>();

  constructor(private router: Router) {}

  onRetry(): void {
    this.retry.emit();
  }

  onDelete(user: User, event: Event) {
    event.stopPropagation();
    this.delete.emit(user);
  }

  onEdit(user: User) {
    this.router.navigate(['/admin', 'users', user.id]);
  }

  onSearch(searchTerm: string) {
    this.searchUsers.emit(searchTerm);
  }
}
