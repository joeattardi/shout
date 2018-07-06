import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  constructor(private router: Router) {}

  closeModal(): void {
    this.router.navigate(['/admin', 'users']);
  }
}
