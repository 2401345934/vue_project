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

//编辑


//删除


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