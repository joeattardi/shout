import { trigger, style, transition, animate } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { faExclamationTriangle, faToolbox, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { User } from '../../../core/core.types';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  animations: [
    trigger('fade', [transition(':leave', [style({ opacity: 1 }), animate('0.2s', style({ opacity: 0, transform: 'translateX(5%)' }))])])
  ]
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

  constructor(private router: Router) {}

  onRetry(): void {
    this.retry.emit();
  }

  onDelete(user: User) {
    this.delete.emit(user);
  }

  onEdit(user: User) {
    this.router.navigate(['/admin', 'users', user.id]);
  }
}
