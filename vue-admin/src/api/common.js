import { reactive, ref } from "@vue/composition-api";
import { getCategory, getCategoryAll } from "./news";
import service from "@/utils/request";


export function common() {

  const categoryInfo = reactive({
    item: []
  });
  //获取分类
  const getInfo = () => {
    getCategory({})
      .then((res) => {
        categoryInfo.item = res.data.data.data;
      })
      .catch((err) => {
      });
  };


  //获取全部分类
  const getInfoAll = () => {
    getCategoryAll({})
      .then((res) => {
        categoryInfo.item = res.data.data;
      })
      .catch((err) => {
      });
  };


  return {
    getInfo,
    getInfoAll,
    categoryInfo
  };
}


/*
//获取用户数据
username：用户名（string）
truename：真实姓名（string）
phone：手机号（number）
pageNumber：页码（number）*
pageSize：数量（number）*
 */


export const loadTableData = (params) => {
  return service.request({
    method: params.method || "post",
    url: params.url,
    data: params.data || {}
  });
};


// 获取省份
// type："province"*
//
// 获取城市
// type："city"*
// province_code：省份编码*
//
// 获取区县
// type："area"*
// city_code：城市编码*
//
// 获取街道
// type："street" *
// area_code：区县编码*


//获取省份  市区
export function cityPicker(data) {
  return service.request({
    method: "post",
    url:'/cityPicker/',
    data
  });
}