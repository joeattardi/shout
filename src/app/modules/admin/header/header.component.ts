import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { faComment } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  icons = {
    logo: faComment
  };

  constructor(private router: Router) {}

  goToChat(): void {
    this.router.navigate(['/chat']);
  }
}
