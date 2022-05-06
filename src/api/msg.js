import request from "@/utils/request";

export function getArticleMsg() {
  return request({
    url: "msg/get_article",
    method: "get"
  });
}

export function getCommentMsg() {
    return request({
      url: "msg/get_comment",
      method: "get"
    });
  }

  export function getSystemMsg() {
    return request({
      url: "msg/get_system",
      method: "get"
    });
  }