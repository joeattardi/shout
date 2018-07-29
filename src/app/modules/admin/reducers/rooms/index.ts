import { combineReducers } from '@ngrx/store';

import { ErrorState, errorReducer } from './error.reducer';
import { LoadingState, loadingReducer } from './loading.reducer';
import { RoomListState, roomListReducer } from './rooms.reducer';
import { SearchState, searchReducer } from './search.reducer';

export interface RoomsState {
  error: ErrorState;
  loading: LoadingState;
  rooms: RoomListState;
  search: SearchState;
}

export const roomsReducer = combineReducers({
  error: errorReducer,
  rooms: roomListReducer,
  loading: loadingReducer,
  search: searchReducer
});

export const getRoomList = (state: RoomsState) => state.rooms.rooms;
export const getRoomListTotal = (state: RoomsState) => state.rooms.total;
export const getRoomsLoading = (state: RoomsState) => state.loading;
export const getRoomsError = (state: RoomsState) => state.error;
export const getRoomsSearch = (state: RoomsState) => state.search;
