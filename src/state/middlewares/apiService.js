import { fetch } from "../utils";

const apiService = (store) => (next) => (action) => {
  const result = next(action);
  if (!action.meta || !action.meta.async) {
    return new Promise((resolve, reject) => {
      resolve();
      return result;
    });
  }
  const { path, method = "get", body, withToken = false } = action.meta;
  if (!path) {
    throw new Error(`'path' not specified for async action ${action.type}`);
  }

  return fetch(path, method, body, withToken)
    .then(
      (res) => handleResponse(res, action, next),
      (err) => handleErrors(err, action, next)
    )
    .catch((reason) => handleErrors(reason, action, next));
};

const handleErrors = (err, action, next) => {
  let type = `${action.type}_FAILED`;
  let code = err.code;
  if (code === "SUCCESS") {
    type = "auth/LOGOUT";
  }
  next({
    type,
    payload: err.data,
    meta: action.meta,
  });
  console.log("SSS", err);
  return Promise.reject(err);
};

const handleResponse = (res, action, next) => {
  next({
    type: `${action.type}_SUCCESS`,
    payload: res,
    meta: action.meta,
  });
  console.log("resss", res);
  return res;
};

export default apiService;
