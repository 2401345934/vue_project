<template>
  <div>
    <el-row :gutter="16">
      <el-col :span="7">
        <label style="margin-right: 10px;">关键字 :</label>
        <Select :config="data.configOptions" :selectData.sync="data.selectData"/>
      </el-col>
      <el-col :span="5">
        <el-input placeholder="请输入内容" v-model="data.search"></el-input>
      </el-col>

      <el-col :span="8">
        <el-button type="danger" @click="searchTabChange">搜索</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="danger" class="fr" @click="data.ejectFlag = true">添加用户</el-button>
      </el-col>
    </el-row>

    <div class="black-space-30"></div>
    <TableVue :config="data.configTable" :tableRowData.sync="data.tableRowData" ref="tab">
      <template v-slot:status="soltData">
        <el-switch
                @change="handlerSwitch(soltData)"
                v-model="soltData.data.status"
                active-color="#13ce66"
                :disabled="data.returnSwitch"
                inactive-color="#ff4949"
                inactive-value="1"
                active-value="2">
        </el-switch>
      </template>

      <template v-slot:buttons="soltData">
        <el-button type="danger" size="small" @click="deleteBtn(soltData.data)">删除</el-button>
        <el-button type="success" size="small" @click="handlerUpdateTab(soltData.data)">编辑</el-button>
      </template>

      <template v-slot:tableFooterLeft>
        <el-button type="danger" size="small" @click="deleteBtns">批量删除</el-button>
      </template>

    </TableVue>

    <!--新增弹出框-->
    <Eject :flag.sync="data.ejectFlag" @closeTabChange="changeTabData"/>
    <!--@close="closEeject" :tmp="options.item" :flag2="GxInfoList"-->
    <UpdateInfo :flag.sync="data.UpdateFlag" :editData="data.editData " @closeTabChange="changeTabData"></UpdateInfo>
  </div>
</template>

<script>
  import { reactive, ref, isRef, onMounted, watch, provide } from "@vue/composition-api";
  import Select from "@/components/Select";
  import TableVue from "@/components/Table";
  import Eject from "./dialog/add";
  import UpdateInfo from "./dialog/updateinfo";
  import { global } from "@/utils/global";
  import { userDelete, actives, role } from "@/api/user";

  export default {
    name: "index",
    components: {
      Select,
      TableVue,
      Eject,
      UpdateInfo
    },
    setup(props, { root, refs }) {


      const { str, confirm } = global();


      const data = reactive({
        tableRowData: {},   //接收被选中的数据 进行批量删除
        returnSwitch: false,  //阻止开关
        configOptions: {
          init: ["username", "phone"]
        },
        configTable: {
          //表头
          tHead: [
            { label: "邮箱/用户名", field: "username", width: 120 },
            { label: "真实姓名", field: "truename", width: 80 },
            { label: "手机号", field: "phone", width: 120 },
            { label: "地区", field: "region" },
            { label: "角色", field: "role", width: 80 },
            { label: "禁启用状态", field: "status", columnType: "slot", slotName: "status" },
            { label: "操作", columnType: "slot", slotName: "buttons" }
          ],
          selectionShow: true,
          recordCheckbox: false,
          requestData: {
            url: "getUserList",
            method: "post",
            data: {
              pageNumber: 1,
              pageSize: 10
            }
          },
          paginationShow: true,
          paginationLayout: "total, sizes, prev, pager, next, jumper",
          textAlign: "right"
        },
        ejectFlag: false,
        UpdateFlag: false,
        editData: {},
        search: "",  //搜索
        selectData: "" //返回下拉框
      });


      const deleteBtn = (res) => {
        let id = res.id;
        confirm({
          content: "确认删除当前信息 ?",
          tip: "警告",
          fn: confirmDel,
          id: [id]
        });
      };
      const deleteBtns = () => {
        let id = data.tableRowData.id;
        if (id && id.length > 0) {
          confirm({
            content: "确认删除当前信息 ?",
            tip: "警告",
            fn: confirmDelete,
            id: id
          });
        } else {
          root.$message({
            message: "请勾选要删除的数据",
            type: "error"
          });
        }

      };

      //多选删除
      const confirmDelete = (id) => {
        userDelete({ id }).then((res) => {
          root.$message({
            message: res.data.message,
            type: "success"
          });
          changeTabData();
        });
      };

      // 单选删除
      const confirmDel = (id) => {
        userDelete({ id }).then((res) => {
          root.$message({
            message: res.data.message,
            type: "success"
          });
          changeTabData();
        });
      };

      //滑块方法
      const handlerSwitch = (params) => {
        if (data.returnSwitch) return;
        data.returnSwitch = true;
        actives({ id: params.data.id, status: params.data.status }).then((res) => {
          root.$message({
            message: res.data.message,
            type: "success"
          });
          data.returnSwitch = false;
        }).catch((err) => {
          root.$message({
            message: `修改失败请重试`,
            type: "error"
          });
          data.returnSwitch = false;
        });
      };


      //编辑
      const handlerUpdateTab = (params) => {
        data.UpdateFlag = true;
        data.editData = params;
      };


      //搜索
      const searchTabChange = () => {
        let obj = data.selectData;

        if (obj[0].value === "phone") {
          data.search = Number(data.search);
        }
        ;

        let response = {
          [obj[0].value]: data.search,
          pageNumber: 1,
          pageSize: 10
        };
        refs.tab.gxTabData(response);

      };

      const changeTabData = () => {
        refs.tab.gxTabDataList();

      };

      onMounted(() => {
      });

      return {
        data,
        deleteBtn,
        deleteBtns,
        changeTabData,
        handlerSwitch,
        handlerUpdateTab,
        searchTabChange
      };
    }
  };
</script>

<style scoped lang="scss">

</style>


<!--
组件目录  src > components > Select > index
组件引用方式   import Select from "@/components/Select";
template:  <Select  :config="data.configOption" />

参数配置
configOption: {
  init: ["name", "email" , ...]
}

configOption  类型 Object
init   类型 Array


-->