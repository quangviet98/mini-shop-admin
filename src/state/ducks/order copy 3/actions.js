import * as types from "./types";
import apiAction, { defaultAction } from "../utils/createAction";

export const getOrders = (id) =>
  apiAction("get")(types.GET_ORDERS, `/Order/${id}`, {});
