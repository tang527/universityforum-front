import request from "@/utils/request";

export function userLogin(data) {
  return request({
    url: "/user/login",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export function userLogout() {
  return request({
    url: "/user/logout",
    method: "post",
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export function register(data) {
  return request({
    url: "/user/register",
    method: "post",
    // data: qs.stringify(data),
    data: data,
    headers: {
      //   "Content-Type": "application/x-www-form-urlencoded"
      "Content-Type": "application/json"
    }
  });
}

export function updateInfo(data) {
  return request({
    url: "/user/update_info",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/json"
    }
  });
}
