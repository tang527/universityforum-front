import Vue from "vue";
import Router from "vue-router";
import NotFoundComponent from "../components/NotFoundComponent.vue";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "forumhome",
    component: () => import("../components/forumHome/ForumHome.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/Login.vue")
  },
  {
    path: "/loginbackstage",
    name: "loginbackstage",
    component: () => import("../components/backstagehome/LoginBackStage.vue")
  },

  {
    path: "/backstagehome",
    component: () => import("../components/backstagehome/BackStageHome.vue"),
    children: [
      {
        path: "/usermanger",
        name: "usermanger",
        component: () => import("../components/backstagehome/UserManger.vue")
      },
      {
        path: "/articlemanger",
        name: "articlemanger",
        component: () => import("../components/backstagehome/ArticleManger.vue")
      },
      {
        path: "/typemanger",
        name: "typemanger",
        component: () => import("../components/backstagehome/TypeManger.vue")
      }
    ]
  },
  {
    path: "/userhome",
    meta: { requireAuth: true },
    component: () => import("../components/userhome/UserHome")
  },
  {
    path: "/msg",
    component: () => import("../components/msg/Msg")
  },
  {
    path: "/article/:typeId",
    name: "Article",
    component: () => import("../components/articlehome/ArticleHome")
  },

  {
    path: "/registerhome",
    component: () => import("../components/register/RegisterHome")
  },

  {
    path: "*",
    component: NotFoundComponent
  },
  {
    path: "/details/:artId",
    name: "Details",
    component: () => import("../components/articlehome/Details")
  },
  {
    path: "/postarticle",
    name: "PostArticle",
    component: () => import("../components/articlehome/PostArticle")
  }
];

/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
