import App from "./App.vue";
import Vue from "vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import moment from "moment"; // 导入文件

import {imageIsExist} from "./utils/realImg"; // 此处为自定义指令
import net from "@/constant/net.constant";
import asset from "@/constant/asset.constant";
import constant from "@/constant/constant";


Vue.prototype.$moment = moment; //赋值使用
moment.locale("zh-cn"); //国际化，中文
Vue.use(Buefy);
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

// 常量引入
Vue.prototype.NET = net;
Vue.prototype.ASSET = asset;
Vue.prototype.CONSTANT = constant;

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(m => m.meta.requireAuth)) {
//     // 对路由进行验证
//     if (store.state.isLogin) {
//       // 已经登陆
//       next(); // 正常跳转到你设置好的页面
//     } else {
//       // 未登录则跳转到登陆界面
//       next({ path: "/login" });
//     }
//   } else {
//     next();
//   }
// });

// 定义全局自定义指令
//全局注册自定义指令，用于判断当前图片是否能够加载成功，可以加载成功则赋值为img的src属性，否则使用默认图片
Vue.directive('real-img', async function (el, binding) {
    let imgURL = binding.value;//获取图片地址
    let defaultURL = el.getAttribute('default-img');//获取默认图片地址
    if (imgURL) {
        let exist = await imageIsExist(imgURL);
        if (exist) {
            el.setAttribute('src', imgURL);
        } else {
            if (defaultURL) {
                el.setAttribute('src', defaultURL);
            }
        }
    }
})

new Vue({
    router,
    store,
    axios,
    // render: function (h) {
    //   return h(App);
    // }
    render: h => h(App)
  }).$mount("#app");

