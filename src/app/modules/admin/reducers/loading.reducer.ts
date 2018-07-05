export type LoadingState = boolean;

const initialState: LoadingState = false;

export function loadingReducer(state: LoadingState = initialState, action): LoadingState {
  switch (action.type) {
    default:
      return state;
  }
}
