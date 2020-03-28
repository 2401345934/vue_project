<template>
  <div>
    <el-row :gutter="19">
      <el-col :span="4">
        <div class="label-wrap category">
          <label>分类:</label>
          <div class="wrap-content">
            <el-select v-model="variable.value" placeholder="请选择" style="width: 110%;">
              <el-option
                      v-for="item in options.item"
                      :key="item.value"
                      :label="item.category_name"
                      :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="label-wrap date">
          <label>日期:</label>
          <div class="wrap-content">
            <el-date-picker
                    v-model="variable.value2"
                    type="datetimerange"
                    align="right"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :default-time="['12:00:00', '08:00:00']"
                    style="width: 100%;">
            </el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="label-wrap key-word">
          <label>关键字:</label>
          <div class="wrap-content">
            <el-select v-model="variable.value3" style="width: 100%;">
              <el-option v-for="(item,index) in searchOption"
                         :key="item.id"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </div>
        </div>
      </el-col>

      <el-col :span="3">
        <el-input v-model="variable.search" placeholder="请输入内容" style="width: 100%;"></el-input>
      </el-col>

      <el-col :span="2">
        <el-button type="danger" style="width: 100%;" @click="search">搜索</el-button>
      </el-col>
      <el-col :span="2" style="margin-left: 41px;">
        <el-button type="danger" class="fr" style="width: 100%;" @click="variable.ejectFlag = true">新增</el-button>
      </el-col>
    </el-row>


    <div class="black-space-30"></div>


    <!--表格-->
    <el-table :data="tableData.item" border style="width: 100%" @selection-change="handleSelectionChange"
              v-loading="variable.loadingData">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="categoryId" label="类型" width="100" :formatter="toCategory"></el-table-column>
      <el-table-column prop="createDate" label="日期" width="160" :formatter="toData"></el-table-column>
      <el-table-column prop="id" label="管理员" width="100"></el-table-column>
      <el-table-column label="操作" width="280">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteItem(scope.row.id)">删除</el-button>
          <el-button type="success" size="mini" @click="UpdateInfoBj(scope.row.id)">编辑</el-button>
          <el-button type="success" size="mini" @click="handlerUp(scope.row)">编辑详情</el-button>
        </template>

      </el-table-column>
    </el-table>

    <div class="black-space-30"></div>
    <!--分页-->
    <el-row>
      <el-col :span="10">
        <el-button size="medium" @click="deleteAll">批量删除</el-button>
      </el-col>
      <el-col :span="14" class="fr">
        <el-pagination
                background
                layout="total, sizes ,prev, pager, next"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="1"
                :page-sizes="[10, 20, 30, 40]"
                :total="variable.total">
        </el-pagination>
      </el-col>
    </el-row>

    <!--新增弹出框-->
    <Eject :flag.sync="variable.ejectFlag" @close="closEeject" :tmp="options.item" :flag2="GxInfoList"/>

    <!--修改弹出框-->
    <UpdateInfo :flag.sync="variable.updateDialog" @close="closUpdateInfo" :tmp="options.item" :flag2="GxInfoList"
                :id="variable"/>

  </div>
</template>

<script>
  import Eject from "./dialog/info";
  import UpdateInfo from "./dialog/updateinfo";
  import { reactive, ref, isRef, onMounted, watch } from "@vue/composition-api";
  import { getCategory, getList, deleteInfo } from "@/api/news";
  import { common } from "@/api/common";
  import { timestampToTime } from "../../utils/common";
  // vue3
  import { global } from "@/utils/global";
  //vue 2.0 局部用法
  // import { confirm } from "@/utils/validate";
  export default {
    name: "infoIndex",
    components: {
      Eject,
      UpdateInfo
    },
    setup(props, { root }) {

      const { str, confirm } = global();
      const { getInfo, categoryInfo } = common();


      // 定义一个总变量
      const variable = reactive({
        total: 0,
        value: "",
        value2: "",  //日期
        value3: "id", //关键字
        search: "",//搜索
        ejectFlag: false,   //弹窗
        loadingData: false,
        categoryInfoId: "",
        flag: false,
        updateDialog: false,
        infoId: ""
      });


      //通过父子组件传值 添加后执行更新方法

      const GxInfoList = () => {
        GetList();
        return "更新数据了";
      };

      // 编辑功能
      const UpdateInfoBj = (id) => {
        variable.infoId = id;
        variable.updateDialog = true;

      };

      //定义属性

      const options = reactive({
        item: []
      });


      //搜索关键字

      const searchOption = reactive([
        { value: "id", label: "ID" },
        { value: "title", label: "标题" }
      ]);


      //表格
      const tableData = reactive({
        item: []
      });

      //页码
      let pageNumber = reactive({
        pageNum: 1,
        pageSize: 10
      });


      // 时间转换 日期
      const toData = (row, column, cellValue, index) => {
        return timestampToTime(cellValue);
      };


      //类型转换
      const toCategory = (row) => {
        let categoryName = options.item.filter((item) => item.id == row.categoryId)[0];
        return categoryName ? categoryName.category_name : "空";
      };


      //搜索
      const search = () => {
        GetList();
      };


      const formalData = () => {
        let formData = {
          pageNumber: pageNumber.pageNum,
          pageSize: pageNumber.pageSize
        };
        if (variable.value) {
          formData.categoryId = variable.value;
        }
        if (variable.value.length > 0) {
          formData.startTiem = variable.value2[0];
          formData.endTime = variable.value2[1];
        }
        if (variable.search) {
          formData[variable.value3] = variable.search;
        }
        ;
        return formData;

      };


      //  更新列表数据

      const GetList = () => {
        let data = formalData();

        variable.loadingData = true;
        getList(data)
          .then((res) => {
            tableData.item = res.data.data.data;
            variable.total = res.data.data.total;
            variable.loadingData = false;
          })
          .catch((err) => {
            variable.loadingData = false;
          });
      };

      const formInline = reactive({
        user: "",
        region: ""
      });

      const multipleSelection = reactive([]);


      const handleSizeChange = (val) => {
        pageNumber.pageSize = val;
        GetList();
      };

      const handleCurrentChange = (val) => {
        pageNumber.pageNum = val;
        GetList();
      };
      const closEeject = () => {
        variable.ejectFlag = false;
      };

      const closUpdateInfo = () => {
        variable.updateDialog = false;
      };

      //定义方法
      const handleSelectionChange = (val) => {
        root.multipleSelection = val;
        let id = val.map((item) => item.id);
        variable.categoryInfoId = id;
      };


      const deleteItem = (id) => {
        variable.categoryInfoId = [id];
        confirm({
          content: "确认删除当前信息 ?",
          tip: "警告",
          fn: confirmDelete,
          id: variable.categoryInfoId
        });

        //

      };


      const deleteAll = () => {
        if (!variable.categoryInfoId || variable.categoryInfoId.length === 0) {
          root.$message({
            message: "请勾选要删除的数据",
            type: "error"
          });
          return;
        }
        ;
        confirm({
          content: "确认删除全部信息 ?",
          fn: confirmDelete
        });
      };

      //确认删除 单个  多个
      const confirmDelete = (value) => {
        deleteInfo({ id: variable.categoryInfoId }).then((res) => {
          root.$message({
            message: res.data.message,
            type: "success"
          });
          variable.categoryInfoId = "";
          GetList();
        }).catch((err) => {
        });
      };


      //DOM对象挂载完成 生命周期
      onMounted(() => {
        //Vue  3.0

        getInfo();

        // Vue X
        // root.$store.dispatch("common/getInfoCategory").then((res) => {
        //   options.item = res.data.data.data;
        // })

        GetList();
      });

      //watch  监听  VUE 3.0
      //分类
      watch(() => categoryInfo.item, (value) => {
        options.item = value;
      });

      //编辑详情
      const handlerUp = (params) => {
        //密文
        root.$router.push({
          name: "InfoDetailed",
          params: {
            id: params.id,
            title: params.title
          }
        });

        // 新窗口
        // let routeData = root.$router.resolve({
        //   name: "InfoDetailed",
        //   query: params,
        //   params: {
        //     id: params.id,
        //     title: params.title
        //   }
        // });
        // window.open(routeData.href, "_blank");

        // root.$router.push({
        //   path: `/infoDetailed/${params.id}/${params.title}`
        // })
      };

      return {
        //ref
        variable,
        pageNumber,
        //reactive
        options,
        formInline,
        searchOption,
        tableData,
        multipleSelection,
        handleSelectionChange,
        handleSizeChange,
        handleCurrentChange,
        closEeject,
        deleteItem,
        deleteAll,
        toData,
        toCategory,
        GxInfoList,
        search,
        closUpdateInfo,
        UpdateInfoBj,
        handlerUp
      };
    }

  };
</script>

<style lang="scss" scoped>
  @import "../../styles/config";

  .label-wrap {
    &.category {
      @include labelDom(left, 50, 40)
    }

    &.date {
      @include labelDom(center, 50, 40)
    }

    &.key-word {
      @include labelDom(center, 60, 40)
    }
  }


</style>