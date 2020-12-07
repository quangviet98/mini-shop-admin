import * as types from "./types";

const initialState = {
  user: null,
  isAuthenticated: false,
};

export default function reducer(state = initialState, action) {
  console.log("action", action);
  switch (action.type) {
    case types.GET_ACCOUNT_SUCCESS: {
      const roles = (action.payload.roles || []).filter(
        (role) => role.checked === true
      );
      return {
        ...state,
        user: { ...action.payload, roles },
        isAuthenticated: true,
      };
    }
    case types.LOGOUT:
      return { ...state, user: null, isAuthenticated: false };
    default:
      return state;
  }
}
