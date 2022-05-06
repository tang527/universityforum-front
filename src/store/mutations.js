export default {
  //mutations提交风格ccc(state,payload){}
  //mutation包括两部分1：字符串的事件类型2：一个回调函数，该回调函数的第一个参数就是state
  //login是事件类型，后面是回调函数
  login(state, data) {
    state.isLogin = true;
    state.accessToken = data.accessToken;
    state.refreshToken = data.refreshToken;
    window.localStorage.setItem("accessToken", data.accessToken);
    window.localStorage.setItem("refreshToken", data.refreshToken);

    window.localStorage.setItem("user", JSON.stringify(data));
    state.user = data;
    window.localStorage.setItem("isLogin", true);
    window.localStorage.removeItem("likeList");
  },
  logout(state) {
    state.isLogin = false;
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("isLogin");
    window.localStorage.removeItem("likeList");
  },
  updateUserInfo(state, user) {
    state.user.userName = user.userName;
    state.user.userShow = user.userShow;
    state.user.userSex = user.userSex;
    state.user.userImg = user.userImg;
    // 需要进行字符串解析
    window.localStorage.setItem("user", JSON.stringify(state.user));
  },
  getpagemain(state, payload) {
    state.info = payload.info;
    // state.totalPages = payload.totalPages;
    state.totalElements = payload.totalElements;
  },

  first(state, payload) {
    state.registeruser.userName = payload.userName;
    state.registeruser.userPsw = payload.userPsw;
    state.registeruser.userEmail = payload.userEmail;
  },

  secend(state, payload) {
    state.registeruser.userPhone = payload.userPhone;
    state.registeruser.userSex = payload.userSex;
    state.registeruser.userShow = payload.userShow;
  },

  details(state, info) {
    state.info = info;
  },

  setToken(state, payload) {
    window.localStorage.setItem("accessToken", payload.accessToken);
    window.localStorage.setItem("refreshToken", payload.refreshToken);
    state.accessToken = payload.accessToken;
    state.refreshToken = payload.refreshToken;
  },

  clearToken(state) {
    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("refreshToken");
    state.accessToken = "";
    state.refreshToken = "";
  },
  liked(state, artId) {
    if (state.likeList == "" || state.likeList == null) {
      state.likeList = [];
    }
    state.likeList.push(artId);
    window.localStorage.setItem("likeList", JSON.stringify(state.likeList));
  }
};
