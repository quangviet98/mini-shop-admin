import * as types from "./types";

const initialState = {
  user: null,
  isAuthenticated: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return { ...state, user: action.payload, isAuthenticated: true };
    case types.LOGOUT:
      return { ...state, user: null, isAuthenticated: false };
    default:
      return state;
  }
}
