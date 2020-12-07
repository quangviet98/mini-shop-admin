import * as types from "./types";
import apiAction, { defaultAction } from "../utils/createAction";

export const getOrders = (id) =>
  apiAction("get")(types.GET_ORDERS, `orders/${id}`, {});

export const getOrder = (id) =>
  apiAction("get")(types.GET_ORDER, `orders/detail/${id}`, {});

export const getOrderDetail = (id) =>
  apiAction("get")(types.GET_ORDER_DETAIL, `orders/items/${id}`, {});

export const updateProcess = (id, data = {}) =>
  apiAction("put")(types.PROCESS, `orders/${id}`, data);

export const getDeliver = () =>
  apiAction("get")(types.GET_DELIVER, `/Account/GetDeliver`, {});
