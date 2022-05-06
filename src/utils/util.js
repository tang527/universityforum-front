// 判断str是否为空 或者为 一连串的空格
export const isStrEmpty = function(str) {
  if (typeof str == "undefined" || str == null || str == "") {
    return true;
  } else {
    let reg = "^[ ]+$";
    return new RegExp(reg).test(str);
  }
};
