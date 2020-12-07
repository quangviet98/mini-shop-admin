import * as types from "./types";
import apiAction, { defaultAction } from "../utils/createAction";

export const getAccounts = () =>
  apiAction("get")(types.GET_ACCOUNTS, `accounts`, {});

export const getAccount = (id) =>
  apiAction("get")(types.GET_ACCOUNT, `accounts/${id}`, {});

export const getRolesAccount = (id) =>
  apiAction("get")(types.GET_ACCOUNT, `accounts/roles/${id}`, {});

export const updateRole = (id, data = {}) =>
  apiAction("PUT")(types.UPDATE_ROLE, `accounts/roles/${id}`, data);
