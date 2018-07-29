import { combineReducers } from '@ngrx/store';

import { ErrorState, errorReducer } from './error.reducer';
import { LoadingState, loadingReducer } from './loading.reducer';
import { RoomListState, roomListReducer } from './rooms.reducer';

export interface RoomsState {
  error: ErrorState;
  loading: LoadingState;
  rooms: RoomListState;
}

export const roomsReducer = combineReducers({
  error: errorReducer,
  rooms: roomListReducer,
  loading: loadingReducer
});

export const getRoomList = (state: RoomsState) => state.rooms.rooms;
export const getRoomListTotal = (state: RoomsState) => state.rooms.total;
export const getRoomsLoading = (state: RoomsState) => state.loading;
export const getRoomsError = (state: RoomsState) => state.error;
