import axios from "axios";
import queryString from "query-string";
import { API_URL, BASE_URL } from "../../configs";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
  async (config) => {
    const customHeaders = {};

    // const token = getAuthoz();
    // if (token) {
    //     customHeaders.Authorization = `Bearer ${token}`;
    // }
    // console.log('token', token);
    // console.log('config: ', {
    //     ...config,
    //     headers: { ...customHeaders, ...config.headers }
    // });

    return {
      ...config,
      headers: { ...customHeaders, ...config.headers },
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    if (response.status === 204) {
      return Promise.reject({ status: response.status });
    }
    return response.data;
  },
  (error) => {
    // if (error) {
    //   console.log("err", error);

    //   let {
    //     response: { status, statusText },
    //   } = error;
    //   if (status === 401) {
    //   }
    // }

    return Promise.reject(error);
  }
);

const fetch = (url, method, body, withToken, ctx) => {
  let requestConfigs = {
    url,
    method,
  };
  if (method !== "get") {
    requestConfigs = {
      ...requestConfigs,
      data: body,
    };
  }

  return axiosClient(requestConfigs);
};

export default fetch;
