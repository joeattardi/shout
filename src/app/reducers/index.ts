import { ActionReducerMap } from '@ngrx/store';

import { loadingReducer, State as LoadingState } from './loading.reducer';
import { userReducer, State as UserState } from './user.reducer';

export interface State {
  user: UserState;
  loading: LoadingState;
}

export const reducers: ActionReducerMap<State> = {
  user: userReducer,
  loading: loadingReducer
};
