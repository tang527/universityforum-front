import request from "@/utils/request";

export function uploadAvatar(data) {
  let formdata = new FormData();
  formdata.append("file", data.file);
  return request({
    url: "/common/upload_avatar",
    data: formdata,
    method: "post",
    // 据论坛老哥说如果上传文件时手动设置Content-Type 会出现 the request was rejected because no multipart boundary was found错误
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}

export function uploadImg(data) {
  let formdata = new FormData();
  formdata.append("file", data);
  return request({
    url: "/common/upload_img",
    data: formdata,
    method: "post",
    // 据论坛老哥说如果上传文件时手动设置Content-Type 会出现 the request was rejected because no multipart boundary was found错误
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}
