import request from "@/utils/request";

export function getHotArticleType() {
  return request({
    url: "article_type/get_hot",
    method: "get"
  });
}

export function getAllArticleType() {
  return request({
    url: "article_type/get_all",
    method: "get"
  });
}

export function getHotArticle() {
  return request({
    url: "article/get_hot",
    method: "get"
  });
}

export function getNewArticle() {
  return request({
    url: "article/get_new",
    method: "get"
  });
}

export function getArticleByTypeId(data) {
  return request({
    url: "article/get_article_by_typeId",
    params: data,
    method: "get"
  });
}

export function getArticleByUserId() {
    return request({
      url: "article/user_get_articles_by_userId",
      method: "get"
    });
  }

export function getArticleDetails(artId) {
  return request({
    url: "article/get_details",
    params: { artId: artId },
    method: "get"
  });
}

export function createArticle(data) {
  return request({
    url: "article/create_article",
    data: data,
    method: "post",
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export function likeArticle(data) {
    return request({
      url: "article/like_article",
      params: data,
      method: "get",
      
    });
  }
