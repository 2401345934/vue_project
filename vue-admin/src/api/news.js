import service from "@/utils/request";


//列表
//
export function getList(data) {
  return service.request({
    method: "post",
    url:'/news/getList/',
    data
  });
}

//新增
// /news/add/

export function add(data) {
  return service.request({
    method: "post",
    url:'/news/add/',
    data
  });
}

//添加子级

export function addChildrenCategory(data) {
  return service.request({
    method: "post",
    url:'/news/addChildrenCategory/',
    data
  });
}
//编辑
//

export function editInfo(data) {
  return service.request({
    method: "post",
    url:'/news/editInfo/',
    data
  });
}
//删除
//

export function deleteInfo(data) {
  return service.request({
    method: "post",
    url:'/news/deleteInfo/',
    data
  });
}

//信息 一级分类添加
export function AddFirstCategory(data) {
  return service.request({
    method: "post",
    url:'/news/addFirstCategory/',
    data
  });
}

//获取分类
// /news/getCategory/ （无子级分类）
// /news/getCategoryAll/ （有子级分类）
export function getCategory(data) {
  return service.request({
    method: "post",
    url:'/news/getCategory/',
    data
  });
}

//获取子级分类
// /news/getCategory/ （无子级分类）
// /news/getCategoryAll/ （有子级分类）
export function getCategoryAll(data) {
  return service.request({
    method: "post",
    url:'/news/getCategoryAll/',
    data
  });
}

//删除分类

export function DeleteCategory(data) {
  return service.request({
    method: "post",
    url:'/news/deleteCategory/',
    data
  });
}


//修改分类

export function EditCategory(data) {
  return service.request({
    method: "post",
    url:'/news/editCategory/',
    data
  });
}

//七牛云
/*
* AK  七牛云秘钥AK
* SK  七牛云秘钥sk
* buckety 七牛云存储空间
*
* */

export function uploadImgToken(data) {
  return service.request({
    method: "post",
    url:'/uploadImgToken/',
    data
  });
}

