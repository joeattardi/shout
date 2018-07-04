import { Component } from '@angular/core';

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
}
