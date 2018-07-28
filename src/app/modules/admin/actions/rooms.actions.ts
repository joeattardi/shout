import { Action } from '@ngrx/store';
import { Room } from '../../core/core.types';

export enum RoomsActionTypes {
  SEARCH_ROOMS = '[Admin] search rooms',
  SEARCH_ROOMS_SUCCESS = '[Admin] search rooms success',
  SEARCH_ROOMS_ERROR = '[Admin] search rooms error'
}

export class SearchRooms implements Action {
  readonly type = RoomsActionTypes.SEARCH_ROOMS;
  constructor(public searchTerm: string, public offset = 0) {}
}

export class SearchRoomsSuccess implements Action {
  readonly type = RoomsActionTypes.SEARCH_ROOMS_SUCCESS;
  constructor(public rooms: Room[], public total: number) {}
}

export class SearchRoomsError implements Action {
  readonly type = RoomsActionTypes.SEARCH_ROOMS_ERROR;
}

export type RoomsAction = SearchRooms | SearchRoomsSuccess | SearchRoomsError;
