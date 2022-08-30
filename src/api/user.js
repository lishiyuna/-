// 专门出来用户相关的网络请求
import request from "@/utils/request";

export function login(data) {
  return request({
    method: "post",
    url: "/api/login",
    data,
  });
}

//获取用户列表
export function getWxUserList() {
  return request({
    method: "get",
    url: "/my/getwxusers",
  });
}

//获取一个用户
export function getAwxUser(id) {
  return request({
    method: "get",
    url: "/my/getAwxusers?id=" + id,
  });
}

//删除用户
export function delWxUserList(id) {
  return request({
    method: "delete",
    url: "/my/delwxusers",
    data: {
      id,
    },
  });
}
