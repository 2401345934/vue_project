import { reactive, ref } from "@vue/composition-api";
import { getCategory, getCategoryAll } from "./news";


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