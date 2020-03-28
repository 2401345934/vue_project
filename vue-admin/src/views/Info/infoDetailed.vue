<template>
  <div id="infoDetailed">
    <el-form ref="form" :model="data.form" label-width="100px" v-loading="data.loadingData">
      <el-form-item label="信息分类 : ">
        <el-select v-model="data.value" placeholder="请选择">
          <el-option
                  v-for="item in data.options.item"
                  :key="item.value"
                  :label="item.category_name"
                  :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="新闻标题 : ">
        <el-input v-model="data.form.title"></el-input>
      </el-form-item>
      <el-form-item label="缩略图 : ">
        <UpdateLoadimg :imgUrl.sync="data.form.imgUrl"/>
      </el-form-item>
      <el-form-item label="发布日期 : ">
        <el-date-picker
                v-model="data.form.dataTime"
                type="date"
                placeholder="选择日期"
                :disabled="data.disabled">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="详细内容 : ">
        <quillEditor v-model="data.form.content" ref="myQuillEditor" :options="data.editorOption"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>

    </el-form>
  </div>

</template>

<script>
  import { reactive, ref, isRef, onMounted, watch } from "@vue/composition-api";
  import { getCategory, getList, editInfo, uploadImgToken } from "@/api/news";
  import { timestampToTime } from "../../utils/common";
  import UpdateLoadimg from "@/components/Uploadimg/index.vue"
  //富文本
  import { quillEditor } from "vue-quill-editor";
  import "quill/dist/quill.core.css";
  import "quill/dist/quill.snow.css";
  import "quill/dist/quill.bubble.css";

  export default {
    name: "infoDetailed",
    components: {
      quillEditor,UpdateLoadimg
    },
    setup(props, { root }) {

      //H5 本地存储 结合密文
      if (root.$route.params.title) {
        root.$store.commit("infoDetailed/SET_UPDATE", {
          id: {
            value: root.$route.params.id,
            sessionKey: "infoId",
            session: true
          },
          title: {
            value: root.$route.params.title,
            sessionKey: "infoTitle",
            session: true
          }
        });
        // root.$store.commit("infoDetailed/SET_TITLE", root.$route.params.title);
        // root.$store.commit("infoDetailed/SET_ID", root.$route.params.id);
      }
      ;

      console.log(sessionStorage.getItem("infoId"));

      //定义总变量
      const data = reactive({
        value: "",
        disabled: true, //禁用日期
        options: {  //分类下拉框
          item: []
        },
        form: {   //form 表单数据
          name: "",
          region: "",
          title: "", //标题
          dataTime: "", //日期
          content: "", //textarea
          imgUrl: ""
        },
        loadingData: true,  //loading
        editorOption: {},
      });

      //请求数据
      const getInfoList = () => {
        getList(
          { id: sessionStorage.getItem("infoId"), pageNumber: 1, pageSize: 10 }
        ).then((res) => {
          let response = res.data.data.data[0];
          data.form.title = response.title;
          data.form.content = response.content;
          data.value = response.categoryId;
          data.form.dataTime = timestampToTime(response.createDate);
          data.loadingData = false;
        });
      };


      //form 方法
      const onSubmit = () => {
        data.loadingData = true;


        let response = {
          categoryId: data.value,
          title: data.form.title,
          content: data.form.content,
          id: sessionStorage.getItem("infoId"),
          imgUrl: data.form.imgUrl
        };
        //保存
        editInfo(response).then((res) => {
          root.$message({
            message: res.data.message,
            type: "success"
          });
          getInfoList();
          data.loadingData = false;
          root.$router.push("/infoIndex")
        }).catch((err) => {
          root.$message({
            message: "修改失败请重试 !!! ",
            type: "error"
          });
        });

      };



      //挂载后
      onMounted(() => {
        //Vue  3.0

        // Vue X
        root.$store.dispatch("common/getInfoCategory").then((res) => {
          data.options.item = res.data.data.data;
        });

        getInfoList();
      });



      return {
        onSubmit,
        data,
      };

    }


  };
</script>

<style scoped lang="scss">

  #infoDetailed {

  }

</style>