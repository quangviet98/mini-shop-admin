import * as types from "./types";
import apiAction, { defaultAction } from "../utils/createAction";

export const getCategories = () =>
  apiAction("get")(types.GET_CATEGORIES, `categories`, {});
export const createCategory = (data) =>
  apiAction("post")(types.CREATE_CATEGORIES, `categories`, data);
export const getCategoryById = (id) =>
  apiAction("get")(types.CREATE_CATEGORIES, `categories/${id}`, {});
export const updateCategory = (id, data) =>
  apiAction("put")(types.UPDATE_CATEGORY, `categories/${id}`, data);
export const deleteCategory = (id) =>
  apiAction("delete")(types.DELETE_CATEGORY, `categories/${id}`, {});
