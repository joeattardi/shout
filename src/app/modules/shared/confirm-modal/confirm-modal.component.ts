import { Component, EventEmitter, Input, Output } from '@angular/core';

import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {
  icons = {
    question: faQuestionCircle
  };

  @Input() title = 'Confirm';
  @Input() cancelButtonText = 'Cancel';
  @Input() confirmButtonText = 'OK';
  @Input() confirmButtonType = 'button-primary';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
