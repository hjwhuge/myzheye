import axios from "axios";
import router from "../router";
import store from "../store";
import createMessage from "@/components/createMessage";
import { removeToken } from "@/utils/auth";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    store.commit("setLoading", true);
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    // console.log("response", response);
    store.commit("setLoading", false);
    const res = response.data;
    const { code } = res;
    if (code !== 2000) {
      if (code === 1001) {
        removeToken();
        router.push("/login");
        return;
      }
      createMessage("error", res.message || "Error");
      // console.error(res.message || "Error");
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    console.log("err" + error); // for debug
    store.commit("setLoading", false);
    return Promise.reject(error);
  }
);

export default service;
