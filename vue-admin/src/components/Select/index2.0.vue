<template>
  <el-select v-model="selectVue" @change="SelectValue">
    <el-option v-for="(item,index) in initOption" :key="item.id"
               :value="item.value" :label="item.label">

    </el-option>
  </el-select>
</template>

<script>
  export default {
    name: "index",
    props: {
      config: {
        type: Object,
        default: () => { }
      }
    },
    data() {
      return {
        options: [   //下拉框
          { value: "name", label: "姓名" },
          { value: "phone", label: "手机号" },
          { value: "email", label: "邮箱" },
          { value: "id", label: "ID" },
          { value: "title", label: "标题" }
        ],
        initOption: [],
        selectVue: ""  , //下拉框的Value
      };
    },
    methods: {
      SelectValue() {
        this.$emit("inputValue", this.selectVue);
      },
      initOptions() {
        let initArr = this.config.init;
        if (initArr.length === 0) {
          console.log("您没有传参数");
          return;
        }
        let optionsArr = [];

        initArr.forEach((item) => {
          let arr = this.options.filter((el) => el.value === item)[0];

          if (arr) {
            optionsArr.push(arr);
            this.initOption = optionsArr;
            this.selectValue = this.initOption[0].value;
          } else {
            console.log(`您传的参数有不正确的`);
          }
        });
      }
    },
    mounted() {
      this.initOptions();
      console.log(444);
      this.$emit("inputValue", this.selectVue);
    },

    beforeCreate() {
      console.log(111);
    },
    created() {
      console.log(222);
    },
    beforeMount() {
      console.log(333);
    },


  };
</script>

<style scoped>

</style>