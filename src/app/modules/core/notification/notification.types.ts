import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export enum NotificationTheme {
  SUCCESS = 'success',
  INFO = 'info',
  ERROR = 'error'
}

export interface Notification {
  theme: NotificationTheme;
  message: string;
  sticky?: boolean;
  icon?: IconDefinition;
}
