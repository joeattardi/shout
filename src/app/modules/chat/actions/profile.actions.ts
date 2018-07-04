import { Action } from '@ngrx/store';
import { UserProfileUpdate } from '../chat.types';

export enum ProfileActionTypes {
  SAVE_PROFILE = '[Edit Profile] save profile',
  SAVE_PROFILE_SUCCESS = '[Edit Profile] save success',
  SAVE_PROFILE_ERROR = '[Edit Profile] save error',
  SAVE_PROFILE_AUTH_ERROR = '[Edit Profile] auth error'
}

export class SaveProfile implements Action {
  readonly type = ProfileActionTypes.SAVE_PROFILE;
  constructor(public profile: UserProfileUpdate) {}
}

export class SaveProfileSuccess implements Action {
  readonly type = ProfileActionTypes.SAVE_PROFILE_SUCCESS;
  constructor(public profile: UserProfileUpdate) {}
}

export class SaveProfileError implements Action {
  readonly type = ProfileActionTypes.SAVE_PROFILE_ERROR;
}

export class SaveProfileAuthError implements Action {
  readonly type = ProfileActionTypes.SAVE_PROFILE_AUTH_ERROR;
}

export type ProfileAction = SaveProfile | SaveProfileSuccess | SaveProfileError | SaveProfileAuthError;
