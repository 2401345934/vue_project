<template>
    <div id="login">
        <div class="login-wrap">
            <!--登陆  注册-->
            <ul class="menu-tab">
                <li :class="{current:item.current}" v-for="item in menuTab" :key="item.id" @click="toggleMenu(item)">
                    {{ item.txt }}
                </li>
            </ul>
            <!--登陆  注册-->
            <!--表单-->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium ">

                <el-form-item prop="username" class="item-form">
                    <label>邮箱</label>
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item prop="password" class="item-form">
                    <label>密码</label>
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off" maxlength="20" minlength="6"></el-input>
                </el-form-item>

                <el-form-item prop="code" class="item-form">
                    <label>验证码</label>
                    <el-row :gutter="10">
                        <el-col :span="15">
                            <div class="grid-content bg-purple">
                                <el-input v-model.number="ruleForm.code" maxlength="6" minlength="6"></el-input>
                            </div>
                        </el-col>
                        <el-col :span="9">
                            <div class="grid-content bg-purple">
                                <el-button type="success" class="block" >获取验证码</el-button>
                            </div>
                        </el-col>

                    </el-row>
                </el-form-item>

                <el-form-item>
                    <el-button type="danger" @click="submitForm('ruleForm')" class="item-btn block">提交</el-button>
                </el-form-item>
            </el-form>
            <!--表单-->
        </div>
    </div>
</template>

<script>
    import { stripscript , validateEmail } from "@/utils/validate";

    export default {
    name: "login",
    data() {

      // 验证用户名

      var validateUsername = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入用户名"));

        } else if (validateEmail(value)){

          callback(new Error("用户名格式有误"));

        }
        callback();

      };

      //验证密码
      var validatePassword = (rule, value, callback) => {

        //  过滤后的数据
        this.ruleForm.password = stripscript(value);

        value = this.ruleForm.password;

        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (!reg.test(value)) {
          callback(new Error("密码格式为6到20位数字字母组合!"));
        } else {
          callback();
        }
      };

      //验证  验证码
      var validateCode = (rule, value, callback) => {
        //  过滤后的数据
        this.ruleForm.code = stripscript(value);
        value = this.ruleForm.code;

        let reg = /^[a-z0-9]{6}$/
        if (!value) {
          return callback(new Error("请输入验证码"));
        } else if (!reg.test(value)) {
          return callback(new Error("验证码不正确"));
        }else {
            callback()
        }
      };


      return {
        menuTab: [
          { txt: "登陆", current: true },
          { txt: "注册", current: false }
        ],
        ruleForm: {
          username: "",
          password: "",
          code: ""
        },
        rules: {
          username: [
            { validator: validateUsername, trigger: "blur" }
          ],
          password: [
            { validator: validatePassword, trigger: "blur" }
          ],
          code: [
            { validator: validateCode, trigger: "blur" }
          ]
        }
      };
    },
    methods: {
      toggleMenu(data) {
        // 登陆 注册 切换 高光
        this.menuTab.forEach((item) => {
          item.current = false;
        });
        data.current = true;
      },
      // 表单
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert("submit!");
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
    },
    created() {

    },
    mounted() {

    }
  };
</script>

<style scoped lang="scss">
    #login {
        background: #344a5f;
        height: 100vh;
    }

    .login-wrap {
        width: 330px;
        margin: auto;
    }

    .menu-tab {
        text-align: center;
        li {
            display: inline-block;
            width: 88px;
            border-radius: 2px;
            color: #fff;
            font-size: 14px;
            line-height: 36px;
            cursor: pointer;
        }

        .current {
            background: rgba(0, 0, 0, .1);
        }
    }

    .login-form {
        margin-top: 29px;

        label {
            display: block;
            color: #fff;
            font-size: 14px;
            margin-bottom: 3px;
        }
        .item-form {
            margin-bottom: 13px;
        }

        .block {
            width: 100%;
            display: block;
        }

        .item-btn {
            margin-top: 19px;
        }
    }
</style>