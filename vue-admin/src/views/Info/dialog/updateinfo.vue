<template>
  <el-dialog title="修改" :visible.sync="data.dialogTableVisible" @close="close" width="580px" @open="openDialog">
    <el-form :model="form" ref="formName">
      <el-form-item label="类别:" :label-width="data.formLabelWidth">
        <el-select v-model="form.category" placeholder="请选择活动区域">
          <el-option v-for="(item,index) in categoryOption.item" :value="item.id" :key="item.id"
                     :label="item.category_name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题:" :label-width="data.formLabelWidth">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-form-item>

      <el-form-item label="概况:" :label-width="data.formLabelWidth">
        <el-input v-model="form.content" placeholder="请输入内容" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="danger" @click="addInfo()" :loading="data.submitLoading">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { reactive, ref, isRef, onMounted, watch } from "@vue/composition-api";
  import { add } from "@/api/news";
  import { getCategory, getList, editInfo } from "@/api/news";

  export default {
    name: "info",
    props: {
      flag: {
        type: Boolean,
        default: false
      },
      flag2: {
        type: Function
      },
      tmp: {
        type: Array,
        default: () => []
      },
      id: {
        type: Object
      }
    },
    setup(props, { root, emit }) {

      //打开弹窗
      const openDialog = () => {
        categoryOption.item = props.tmp;
        getInfoList();

      };


      //请求数据
      const getInfoList = () => {
        getList(
          { id: props.id.infoId, pageNumber: 1, pageSize: 10 }
        ).then((res) => {
          console.log();
          let data = res.data.data.data[0];
          form.title = data.title;
          form.content = data.content;
          form.category = data.categoryId;
        });
      };


      //总数据
      let data = reactive({
        submitLoading: false,
        dialogTableVisible: false,
        dialogFormVisible: false,
        formLabelWidth: "70px"
      });
      // {
      //   category: 分类ID（number）*
      //   title: 标题（string）*
      //   content: 内容
      // }

      //添加
      const addInfo = () => {
        data.submitLoading = true;
        let response = {
          categoryId: form.category,
          title: form.title,
          content: form.content,
          id: props.id.infoId,
        };

        if (!form.title || !form.content || !form.category) {
          root.$message({
            message: "标题和内容不能为空",
            type: "error"
          });
          data.submitLoading = false;
          return;
        }
//id: 信息ID（string）
// categoryId: 分类ID（string）
// title: 标题（string）
// content: 内容（string）
// imgUrl: 缩略图（string

        editInfo(response).then((res) => {
          root.$message({
            message: res.data.message,
            type: "success"
          });
          data.submitLoading = false;
          form.category = "";
          form.title = "";
          form.content = "";
          close();
          props.flag2();
        }).catch((err) => {
          data.submitLoading = false;
        });

      };


      //类别

      const categoryOption = reactive({
        item: []
      });


      //定义数据
      const form = reactive({
        category: "",
        title: "",
        content: ""
      });

      //定义函数
      const close = () => {
        data.dialogTableVisible = false;
        emit("update:flag", false);
        form.category = "";
        form.title = "";
        form.content = "";
      };

      //监听

      watch(() => data.dialogTableVisible = props.flag);


      return {
        form,
        data,
        close,
        openDialog,
        categoryOption,
        addInfo
      };
    }


  };
</script>

<style scoped lang="scss">

</style>