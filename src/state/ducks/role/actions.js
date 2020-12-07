import * as types from "./types";
import apiAction, { defaultAction } from "../utils/createAction";

export const getRoles = () => apiAction("get")(types.GET_ROLES, `roles`, {});
