import * as types from "./types";
import apiAction, { defaultAction } from "../utils/createAction";

export const login = (user, password) =>
  apiAction("get")(types.LOGIN, `/Auth/${user}&${password}`, {});

export const logout = () => defaultAction(types.LOGOUT, {});
