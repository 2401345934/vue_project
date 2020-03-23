<template>
  <el-dialog title="新增" :visible.sync="data.dialogTableVisible" @close="close" width="580px" @open="openDialog">
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

  export default {
    name: "info",
    props: {
      flag: {
        type: Boolean,
        default: false
      },
      tmp: {
        type: Array,
        default: () => []
      }
    },
    setup(props, { root, emit }) {

      //打开弹窗
      const openDialog = () => {
        categoryOption.item = props.tmp;

      };


      //总数据
      let data = reactive({
        submitLoading: false,
        dialogTableVisible: false,
        dialogFormVisible:false,
        formLabelWidth: "70px",
      })
      // {
      //   category: 分类ID（number）*
      //   title: 标题（string）*
      //   content: 内容
      // }

      //添加
      const addInfo = () => {
        data.submitLoading = true;
        let response = {
          category: form.category,
          title: form.title,
          content:form.content,
        }

        if (!form.title || !form.content || !form.category) {
          root.$message({
            message: "标题和内容不能为空",
            type: "error"
          });
          data.submitLoading= false;
          return
        } ;

        add(response).then((res) => {
          root.$message({
            message: res.data.message,
            type: "success"
          });
          response.submitLoading = false;
          form.category = "";
          form.title = "";
          form.content = "";
          close()
        }).catch((err)=>{
          data.submitLoading= false;
        })

      }


      //类别

      const categoryOption = reactive({
        item: []
      });


      //定义数据

      const form = reactive({
        category: "",
        title:"",
        content:""
      });
      const gridData = reactive([{
        date: "2016-05-02",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄"
      }, {
        date: "2016-05-04",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄"
      }, {
        date: "2016-05-01",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄"
      }, {
        date: "2016-05-03",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄"
      }]);


      //定义函数
      const close = () => {
        data.dialogTableVisible = false;
        emit("update:flag", false);
      };

      //监听

      watch(() => data.dialogTableVisible = props.flag);


      return {
        form,
        data,
        gridData,
        close,
        openDialog,
        categoryOption,
        addInfo,
      };
    }


  };
</script>

<style scoped lang="scss">

</style>