import { cityPicker } from "@/api/common";

import { reactive, ref, isRef, onMounted, watch, toRefs } from "@vue/composition-api";


export function ckiyP() {
  //请求省

  //总数据
  const data = reactive({
    provinceValue: "",   //省绑定
    getProvinceList: [],  //省
    cityValue: "",//市绑定
    cityList: [],  //区
    areaValue: "",//区绑定
    areaList: [],  //区
    streetValue: "",//街道绑定
    streetList: []  //街道
  });

  const getProvince = () => {
    cityPicker({ type: "province" }).then((res) => {
      data.getProvinceList = res.data.data.data;
    });
  };


  //省方法
  const handlerProvince = (val) => {
    resetValue({ type: "city" });

    getData({ type: "city", province_code: val })

  };

  const getData = (response) => {
    cityPicker( response ).then((res) => {
      data[`${response.type}List`] = res.data.data.data;
    });
  }


  //市方法
  const handlerCity = (val) => {

    //获取区
    resetValue({ type: "area" });
    getData({ type: "area", city_code:val })

  };

  //区方法
  const handlerArea = (val) => {
    resetValue({ type: "street" });
    getData({ type: "street", area_code: val })
  };


  //镇方法
  const handlerStreet = () => {
    resetValue();
  };



  //重置方法
  const resetValue = (params) => {

    if (params) {
      const valueJson = {
        city: ["cityValue", "areaValue", "streetValue"],
        area: ["areaValue", "streetValue"],
        street: ["streetValue"]
      };
      valueJson[params.type].forEach((item) => data[item] = "");
    }

    result();

  };
  //返回所选数据
  const resultData = reactive({
    provinceValue: "",   //省绑定
    cityValue: "",//市绑定
    areaValue: "",//区绑定
    streetValue: ""//街道绑定
  });

  //返回数据方法
  const result = () => {
    for (let k in resultData) {
        resultData[k] = data[k];
    }
  };


  return {
    data,
    resultData,
    getProvince,
    handlerStreet,
    handlerProvince,
    handlerCity,
    handlerArea
  };
}