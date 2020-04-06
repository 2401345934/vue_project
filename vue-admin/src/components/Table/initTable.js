import { reactive, ref, isRef, onBeforeMount, watch } from "@vue/composition-api";
import { requestUrl } from "@/api/requestUrl";

export  function initTable() {

  const initTabData = (params) => {
    let keys = Object.keys(params.data);
    for (let key in params.res) {
      if (keys.includes(key)) {
        params.data[key] = params.res[key];
      }
    }
  }
  return {
    initTabData
  }
}