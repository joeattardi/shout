import { Component, Input } from '@angular/core';

import { faToolbox, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { User } from '../../../core/core.types';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  icons = {
    admin: faToolbox,
    delete: faTrashAlt
  };

  @Input() users: User[];
  @Input() loading = false;
}
