// 专门出来用户相关的网络请求
import request from "@/utils/request";
//获取文章标题的接口

export function expents() {
  return request({
    method: "get",
    url: "/api/allarticle",
  });
}
//根据id获取内容的接口
export function article(id) {
  return request({
    method: "get",
    url: "/api/article",
    params: {
      id,
    },
  });
}
//上传文章内容
export function table(value, text, title, time, contentText) {
  return request({
    method: "post",
    url: "/api/table",
    data: {
      content: value,
      text: text,
      title: title,
      time: time,
      contentText: contentText,
    },
  });
}
//修改内容的接口
export function Modifyarticle(id, value) {
  return request({
    method: "post",
    url: "/api/Modifyarticle",
    data: {
      id: id,
      content: value,
    },
  });
}
//修改内容的删除
export function delectinterface(id) {
  return request({
    method: "delete",
    url: "/api/delectinterface",
    data: {
      id: id,
    },
  });
}
//获取所有集团信息
export function groups() {
  return request({
    method: "get",
    url: "/api/groups",
  });
}
//根据id获取内容信息
export function doctors(id) {
  return request({
    method: "get",
    url: "/api/getDoct",
    params: {
      groupId: id,
    },
  });
}
//获取全部医生内容信息
export function doctor() {
  return request({
    method: "get",
    url: "/api/doctors",
  });
}
//删除医生的接口
export function delecydoctor(id) {
  return request({
    method: "delete",
    url: "/api/getdelete",
    data: {
      id,
    },
  });
}
//修改内容
export function setdoctor(
  data
  ) {
    return request({
      method: "post",
      url: "/api/setdoctor",
      data});
  }
//根据id获取医生信息
export function iddoctor(id) {
  return request({
    method: "get",
    url: "/api/iddoctor",
    params: {
      id,
    },
  });
}
//新增内容

// export function newdoctor(team, department, position, photo, onlineTime, unit, desc1,groupId) {
//   return request({
//     method: "post",
//     url: "/api/newdoctor",
//     data: {
//       team, department, position, photo, onlineTime, unit, desc1,groupId
//     },
//   });
// }
export function newdoctor(data) {
  return request({
    method: "post",
    url: "/api/newdoctor",
    data
  });
}
