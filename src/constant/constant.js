// 通用常量
const ARTICLE_KIND_MAP = new Map();
ARTICLE_KIND_MAP["hot"] = "热门帖子";
ARTICLE_KIND_MAP["new"] = "最新帖子";

const ARTICLE_ORDER_OPT = [
  {
    value: "like",
    label: "点赞数优先"
  },
  {
    value: "view",
    label: "浏览量优先"
  },
  {
    value: "comment",
    label: "评论数优先"
  },
  {
    value: "updated",
    label: "最新更新"
  },
  {
    value: "created",
    label: "最早发帖"
  }
];

export default {
  ARTICLE_KIND_MAP,
  ARTICLE_ORDER_OPT
};
