<template>
  <el-select v-model="data.selectValue" @change="SelectValue">
    <el-option v-for="(item,index) in data.initOption" :key="item.id"
               :value="item.value" :label="item.label">
    </el-option>
  </el-select>
</template>

<script>
  import { reactive, ref, isRef, onMounted, watch } from "@vue/composition-api";

  export default {
    name: "index",
    props: {
      config: {
        type: Object,
        default: () => {
        }
      },
      selectData: {
        type: [Array,String,Object],
        default: () => {
        }
      }
    },
    setup(props, { root, emit }) {


      const data = reactive({
        options: [   //下拉框
          { value: "username", label: "姓名" },
          { value: "phone", label: "手机号" },
          { value: "email", label: "邮箱" },
          { value: "id", label: "ID" },
          { value: "title", label: "标题" },
        ],
        initOption: [],
        selectValue: ""   //下拉框的Value
      });


      const SelectValue = () => {

        let obj = data.options.filter((item) => item.value === data.selectValue);
        emit("inputValue", data.selectValue);
        emit("update:selectData", obj);
      };

      //初始化下拉选项
      let initOptions = () => {


        let initArr = props.config.init;
        if (initArr.length === 0) {
          console.log("您没有传参数");
          return;
        }
        ;

        let optionsArr = reactive([]);

        initArr.forEach((item) => {
          let arr = data.options.filter((el) => el.value === item)[0];

          if (arr) {
            optionsArr.push(arr);
            data.initOption = optionsArr;
            data.selectValue = data.initOption[0].value;
          } else {
            console.log(`您传的参数有不正确的`);
          }


          //复杂版
          // let initArr = props.config.init;
          // if (initArr.length === 0) {
          //   console.log("您没有传参数");
          //   return false;
          // }
          // ;
          //
          // let optionsArr = reactive([]);
          //
          // initArr.forEach((item) => {
          //   let arr = data.options.filter((el) => el.value === item);
          //
          //   if (arr.length > 0) {
          //     optionsArr.push(arr[0]);
          //   }
          //
          //   if (optionsArr.length === 0) {
          //     console.log("匹配数据为空");
          //     return false;
          //   }
          //   ;
          //
          //   data.initOption = optionsArr;
          //   data.selectValue = data.initOption[0].value;
        });
      };

      //组件挂载后
      onMounted(() => {
        initOptions();
        emit("inputValue", data.selectValue);
      });


      return {
        data,
        initOptions,
        SelectValue
      };
    }
  };
</script>

<style scoped>

</style>