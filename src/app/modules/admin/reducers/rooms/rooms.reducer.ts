import { Room } from '../../../core/core.types';
import { RoomsAction, RoomsActionTypes } from '../../actions/rooms.actions';
import { UsersActionTypes } from '../../actions';

export interface RoomListState {
  rooms: Room[];
  total: number;
}

const initialState: RoomListState = {
  rooms: [],
  total: 0
};

export function roomListReducer(state = initialState, action: RoomsAction): RoomListState {
  switch (action.type) {
    case RoomsActionTypes.SEARCH_ROOMS:
      return {
        ...state,
        rooms: [],
        total: 0
      };

    case RoomsActionTypes.SEARCH_ROOMS_SUCCESS:
      return {
        ...state,
        rooms: action.rooms,
        total: action.total
      };

    case RoomsActionTypes.SEARCH_ROOMS_ERROR:
      return {
        ...state,
        rooms: [],
        total: 0
      };

    default:
      return state;
  }
}
