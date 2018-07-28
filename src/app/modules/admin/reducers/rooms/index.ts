import { combineReducers } from '@ngrx/store';

import { LoadingState, loadingReducer } from './loading.reducer';
import { RoomListState, roomListReducer } from './rooms.reducer';

export interface RoomsState {
  loading: LoadingState;
  rooms: RoomListState;
}

export const roomsReducer = combineReducers({
  rooms: roomListReducer,
  loading: loadingReducer
});

export const getRoomList = (state: RoomsState) => state.rooms.rooms;
export const getRoomListTotal = (state: RoomsState) => state.rooms.total;
export const getRoomsLoading = (state: RoomsState) => state.loading;
