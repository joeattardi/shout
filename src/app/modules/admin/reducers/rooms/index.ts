import { combineReducers } from '@ngrx/store';

import { RoomListState, roomListReducer } from './rooms.reducer';

export interface RoomsState {
  rooms: RoomListState;
}

export const roomsReducer = combineReducers({
  rooms: roomListReducer
});

export const getRoomList = (state: RoomsState) => state.rooms.rooms;
export const getRoomListTotal = (state: RoomsState) => state.rooms.total;
