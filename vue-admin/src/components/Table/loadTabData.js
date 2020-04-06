import { reactive, ref, isRef, onBeforeMount, watch } from "@vue/composition-api";
import { requestUrl } from "@/api/requestUrl";
import { loadTableData } from "@/api/common";

export function tableLoadData() {


  const Data = reactive({
    item: [],
    total: 0
  });

  const tableLoad = (params) => {
    let requestJson = params;
    let resDate = {
      url: requestUrl[requestJson.url],
      method: requestJson.method,
      data: requestJson.data
    };
    loadTableData(resDate).then((res) => {
      let date = res.data.data.data;
        Data.item = date;
        Data.total = data.length === 0 ? 0 : res.data.data.total;

    }).catch((err) => {

    });
  };

  return {
    Data, tableLoad
  };


}


/*
* 这是页面是用来替换数据的
* 把table 组件的数组替换成 外部传递过来的数组
* */