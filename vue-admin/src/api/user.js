import service from "@/utils/request";

//获取 角色列表
export function role(data = {}) {
  return service.request({
    method: "post",
    url:'/role/',
    data
  });
}
//系统 列表


export function getSystem(data = {}) {
  return service.request({
    method: "post",
    url:'/system/',
    data
  });
}
//添加
export function userAdd(data) {
  return service.request({
    method: "post",
    url:'/user/add/',
    data
  });
}


//删除
export function userDelete(data) {
  return service.request({
    method: "post",
    url:'/user/delete/',
    data
  });
}


//用户禁启用

export function actives(data) {
  return service.request({
    method: "post",
    url:'/user/actives/',
    data
  });
}

//修改

export function editUpdata(data) {
  return service.request({
    method: "post",
    url:'/user/edit/',
    data
  });
}

//获取按钮


export function permButton(data) {
  return service.request({
    method: "post",
    url:'/permButton/',
    data
  });
}