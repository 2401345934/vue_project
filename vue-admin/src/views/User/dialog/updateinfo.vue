<template>
  <el-dialog title="修改" :visible.sync="data.dialogTableVisible" @close="close" width="700px" @open="openDialog">
    <el-form :model="form">
      <el-form-item label="用户名:" :label-width="data.formLabelWidth">
        <el-input v-model="form.user" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="密码:" :label-width="data.formLabelWidth">
        <el-input v-model="form.pass" placeholder="请输入数字加字母"></el-input>
      </el-form-item>
      <el-form-item label="姓名:" :label-width="data.formLabelWidth">
        <el-input v-model="form.name" placeholder="请输入真实姓名" disabled></el-input>
      </el-form-item>

      <el-form-item label="手机号:" :label-width="data.formLabelWidth">
        <el-input v-model.number="form.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="地区:" :label-width="data.formLabelWidth">
        <CityPicker :cityPickerData.sync="data.cityPickerData"></CityPicker>
      </el-form-item>
      <el-form-item label="是否启用:" :label-width="data.formLabelWidth">
        <el-radio v-model="form.radio" label="1">禁用</el-radio>
        <el-radio v-model="form.radio" label="2">启用</el-radio>
      </el-form-item>
      <el-form-item label="角色:" :label-width="data.formLabelWidth">
        <el-checkbox-group v-model="form.role">
          <el-checkbox :label="item.name" v-for="item in data.roleList" :key="item.name"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="按钮权限 :" :label-width="data.formLabelWidth">
        <template v-if="data.permButton.length > 0">
          <template v-for="item in data.permButton">
            <h4>{{item.name}}</h4>
            <template v-if="item.perm && item.perm.length > 0">
              <el-checkbox-group v-model="form.permButton" >
                <el-checkbox :label="i.value" :key="i.value" v-for="i in item.perm">{{i.name}}</el-checkbox>
              </el-checkbox-group>
            </template>

          </template>

        </template>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="danger" @click="submitForm()" :loading="data.submitLoading">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import sha1 from "js-sha1";
  import { reactive, ref, inject, onMounted, watch, onBeforeMount } from "@vue/composition-api";
  import CityPicker from "@/components/CityPicker";
  import { role, editUpdata ,getSystem , permButton } from "@/api/user";
  import { stripscript, validateEmail, validateP, validateC } from "@/utils/validate";

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
      editData: {
        type: Object,
        default: () => {
        }
      }
    },
    components: {
      CityPicker
    },
    setup(props, { root, emit, refs }) {


      //打开弹窗
      const openDialog = () => {
        getRole();
        categoryOption.item = props.tmp;
        form.user = props.editData.username;
        form.name = props.editData.truename;
        form.phone = props.editData.phone;
        form.radio = props.editData.status;
        data.cityPickerData = JSON.parse(props.editData.region);
        form.role = props.editData.role.split(",");
        form.permButton = props.editData.btnPerm ? props.editData.btnPerm.split(",") : [];
        console.log(props.editData.btnPerm);
      };

      //定义数据
      const form = reactive({
        user: "",
        name: "",
        pass: "",
        phone: "",
        radio: "1",  //禁用启用
        region: "",
        role: [],
        permButton:[]
      });


      //总数据
      let data = reactive({
        submitLoading: false,
        dialogTableVisible: false,
        dialogFormVisible: false,
        formLabelWidth: "90px",
        //城市数据
        cityPickerData: {},
        checkList: [],//复选框
        roleList: [],
        permButton: [], //按钮权限

      });
      // 表单
      const submitForm = (() => {
        if (form.user === "") {
          root.$message({
            message: "用户名不能为空",
            type: "error"
          });
          return;
        } else if (validateEmail(form.user)) {
          root.$message({
            message: "用户名格式有误,应该是一个邮箱",
            type: "error"
          });
          return;
        }
        ;

        if (form.name === "") {
          root.$message({
            message: "真实姓名不能为空",
            type: "error"
          });
          return;
        }


        if (form.radio === "") {
          root.$message({
            message: "禁启用状态不能为空",
            type: "error"
          });
          return;
        }

        if (form.role.length === 0) {
          root.$message({
            message: "角色不能为空",
            type: "error"
          });
          return;
        }

        let responseData = {};

        if (form.pass) {
          responseData = {
            id: Number(props.editData.id),
            username: form.user,
            truename: form.name,
            password: form.pass,
            phone: Number(form.phone),
            status: form.radio,
            region: JSON.stringify(data.cityPickerData),
            role: form.role.toString(),
            btnPerm: form.permButton.join()
          };
          responseData.password = sha1(responseData.password);
        } else {
           responseData = {
            id: Number(props.editData.id),
            username: form.user,
            truename: form.name,
            phone: Number(form.phone),
            status: form.radio,
            region: JSON.stringify(data.cityPickerData),
            role: form.role.toString(),
            btnPerm: form.permButton.join()
          };
        };
        editUpdata(responseData).then((res) => {
          root.$message({
            message: res.data.message,
            type: "success"
          });
          close();
          form.user = "";
          form.name = "";
          form.pass = "";
          form.phone = "";
          form.role = [];
          emit("closeTabChange");
        }).catch((err) => {
          root.$message({
            message: err.data.message,
            type: "error"
          });
        });
      });


      //请求角色

      const getRole = () => {
        if (data.permButton.length > 0 && data.roleList.length > 0) {

        } else {
          role().then((res) => {
            data.roleList = res.data.data;
          });
          permButton( {} ).then((res) => {
            data.permButton = res.data.data;
          })
        } ;

      };


      onMounted(() => {

      });


      // username：用户名（string）*
      // truename：真实姓名（string）
// password：密码（string）*
//       phone：手机号（number）
// region：地区（json）
// status：禁启用状态（string）*
//       role：角色类型（string）*


      //类别

      const categoryOption = reactive({
        item: []
      });


      //定义函数
      const close = () => {
        data.dialogTableVisible = false;
        emit("update:flag", false);
        form.user = "";
        form.name = "";
        form.pass = "";
        form.phone = "";
        form.role = [];
      };

      //监听

      watch(() => data.dialogTableVisible = props.flag);


      return {
        form,
        data,
        close,
        openDialog,
        categoryOption,
        submitForm
      };
    }


  };
</script>

<style scoped lang="scss">

</style>