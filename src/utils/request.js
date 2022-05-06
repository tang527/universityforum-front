import axios from "axios";
import store from "@/store";
import router from "@/router";
import { MessageBox } from "element-ui";
import { Message } from "element-ui";

// var domain = "/api";
var domain = "http://localhost:9090";
// axios.defaults.withCredentials = true;

// 创建axios实例
let service = axios.create({
  baseURL: domain,
  timeout: 10000
//   withCredentials: true
});

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.state.accessToken && store.state.accessToken !== "") {
      config.headers["accessToken"] = store.state.accessToken;
      config.headers["refreshToken"] = store.state.refreshToken;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// response响应器
service.interceptors.response.use(
  config => {
    // 若返回代码为 401 (未登录)
    if (config.data.code == 401) {
      MessageBox.confirm("您还未登录!", "提示", {
        confirmButtonText: "登录",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          router.push("/login");
        })
        .catch(() => {
          Message.info("取消操作");
        });
    } else if(config.data.code == 302) {
        Message.warning(config.data.message + " 可通过右上角重新登陆");
        store.commit('logout');
        // todo
        return config.data;
    }
    if (config.headers.accessToken && config.headers.refreshToken) {
      store.commit("setToken", {
        accessToken: config.headers.accessToken,
        refreshToken: config.headers.refreshToken
      });
    }
    return config.data;
  },
  error => {
    Promise.reject(error.data);
  }
);

export default service;

export { domain };
