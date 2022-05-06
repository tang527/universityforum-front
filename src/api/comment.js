import request from "@/utils/request";

export function getArtComments(data) {
  return request({
    url: "comment/get_article_comments",
    params: data,
    method: "get"
  });
}

export function createComment(data) {
  return request({
    url: "comment/create_article_comment",
    data: data,
    method: "post",
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export function createMultiComment(data) {
  return request({
    url: "comment/create_multi_comment",
    data: data,
    method: "post",
    headers: {
      "Content-Type": "application/json"
    }
  });
}
