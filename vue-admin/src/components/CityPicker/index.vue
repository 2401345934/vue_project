<template>
  <div>
    <div class="overflow-h">
      <el-row :gutter="10">
        <el-col :span="6" v-if="init.province">
          <el-select v-model="data.provinceValue" @change="handlerProvince(data.provinceValue)">
            <el-option v-for="item in data.getProvinceList" :key="item.PROVINCE_ID"
                       :value="item.PROVINCE_CODE" :label="item.PROVINCE_NAME">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6" v-if="init.city">
          <el-select v-model="data.cityValue" @change="handlerCity(data.cityValue)">
            <el-option v-for="item in  data.cityList" :key="item.CITY_ID"
                       :value="item.CITY_CODE" :label="item.CITY_NAME">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6" v-if="init.area">
          <el-select v-model="data.areaValue" @change="handlerArea(data.areaValue)">
            <el-option v-for="item in  data.areaList" :key="item.AREA_ID"
                       :value="item.AREA_CODE" :label="item.AREA_NAME">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6" v-if="init.street">
          <el-select v-model="data.streetValue" @change="handlerStreet(data.streetValue)">
            <el-option v-for="item in  data.streetList" :key="item.STREET_ID"
                       :value="item.STREET_CODE" :label="item.STREET_NAME">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import { cityPicker } from "@/api/common";
  import { reactive, ref, isRef, onMounted, watch, onBeforeMount } from "@vue/composition-api";
  import { ckiyP } from "./cikyPicker";

  export default {
    name: "index",
    props: {
      cityPickerData: {
        type: Object,
        default: () => {}

      },
      cityPickerLevel: {
        type: Array,
        default: () => []
      }
    },
    setup(props, { root, emit }) {




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
      const {
        data,
        resultData,
        handlerStreet,
        getProvince,
        handlerProvince,
        handlerCity,
        handlerArea
      } = ckiyP();


      //初始化方法

      const initFu = () => {
        if (props.cityPickerLevel.length === 0) {
          for (let k in init) {
            init[k] = true
          } ;
        } else {
          props.cityPickerLevel.forEach((item) => init[item] = true);
        }
        ;


      };
      //初始化值
      const init = reactive({
        province: false,
        city: false,
        area: false,
        street: false
      });


      watch([
        () => resultData.provinceValue,
        () => resultData.cityValue,
        () => resultData.areaValue,
        () => resultData.streetValue
      ], ([Province, city, area, Street]) => {
        emit("update:cityPickerData", resultData);
      });

      onMounted(() => {
        initFu();
        getProvince();

      });

      return {
        data,
        init,
        handlerProvince,
        handlerCity,
        handlerArea,
        handlerStreet
      };
    }
  };
</script>

<style scoped lang="scss">

</style>