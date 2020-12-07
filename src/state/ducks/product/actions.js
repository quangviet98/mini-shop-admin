import * as types from "./types";
import apiAction, { defaultAction } from "../utils/createAction";

export const getProducts = () =>
  apiAction("get")(types.GET_PRODUCTS, `products`, {});
export const getProductById = (id) =>
  apiAction("get")(types.GET_PRODUCT_BY_ID, `products/${id}`, {});
export const createProduct = (data) =>
  apiAction("post")(types.CREATE_PRODUCT, `products`, data);
export const updateProduct = (id, data) =>
  apiAction("put")(types.CREATE_PRODUCT, `products/${id}`, data);
export const deleteProduct = (id) =>
  apiAction("delete")(types.DELETE_PRODUCT, `products/${id}`, {});
