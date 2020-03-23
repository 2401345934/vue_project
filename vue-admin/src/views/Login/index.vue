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
            <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" class="login-form" size="medium ">

                <el-form-item prop="username" class="item-form">
                    <label>邮箱</label>
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item prop="password" class="item-form">
                    <label>密码</label>
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off" maxlength="20"
                              minlength="6"></el-input>
                </el-form-item>

                <el-form-item prop="passwords" class="item-form" v-if="mol === 'register'">
                    <label>重复密码</label>
                    <el-input type="password" v-model="ruleForm.passwords" autocomplete="off" maxlength="20"
                              minlength="6"></el-input>
                </el-form-item>

                <el-form-item prop="code" class="item-form">
                    <label>验证码</label>
                    <el-row :gutter="10">
                        <el-col :span="15">
                            <div class="grid-content bg-purple">
                                <el-input v-model="ruleForm.code" maxlength="6" minlength="6"></el-input>
                            </div>
                        </el-col>
                        <el-col :span="9">
                            <div class="grid-content bg-purple">
                                <el-button type="success" class="block" @click="getSms()" :disabled="codeBtn.status">{{
                                    codeBtn.text }}
                                </el-button>
                            </div>
                        </el-col>

                    </el-row>
                </el-form-item>

                <el-form-item>
                    <el-button :disabled="loginBtn" type="danger" @click="submitForm('loginForm')"
                               class="item-btn block">{{mol === "login"? "登陆" : "注册"}}
                    </el-button>

                </el-form-item>
            </el-form>
            <!--表单-->
        </div>


    </div>
</template>

<script>
  import sha1 from "js-sha1";
  import { reactive, ref, isRef, onMounted } from "@vue/composition-api";
  import { stripscript, validateEmail, validateP, validateC } from "@/utils/validate";
  import { GetSms, Register, Login } from "@/api/login";

  export default {
    name: "login",
    setup(props, { refs, root }) {
      // 验证用户名

      let validateUsername = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入用户名"));
        } else if (validateEmail(value)) {
          callback(new Error("用户名格式有误"));
        }
        callback();

      };

      //验证密码
      let validatePassword = (rule, value, callback) => {

        //  过滤后的数据
        ruleForm.password = stripscript(value);
        value = ruleForm.password;
        if (value === "") {
          callback(new Error("请输入密码"));
        } else if (validateP(value)) {
          callback(new Error("密码格式为6到20位数字字母组合!"));
        } else {
          callback();
        }
      };


      //验证重复密码
      let validatePasswords = (rule, value, callback) => {

        //  过滤后的数据
        ruleForm.passwords = stripscript(value);

        value = ruleForm.passwords;
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value != ruleForm.password) {
          callback(new Error("密码重复不正确!"));
        } else {
          callback();
        }
      };


      //验证  验证码
      let validateCode = (rule, value, callback) => {
        //  过滤后的数据
        ruleForm.code = stripscript(value);
        value = ruleForm.code;
        if (value === "") {
          return callback(new Error("请输入验证码"));
        } else if (validateC(value)) {
          return callback(new Error("验证码不正确"));
        } else {
          callback();
        }
      };


      //声明数据
      let ruleForm = reactive({
        username: "",
        password: "",
        passwords: "",
        code: ""
      });
      let rules = reactive({
        username: [
          { validator: validateUsername, trigger: "blur" }
        ],
        password: [
          { validator: validatePassword, trigger: "blur" }
        ],
        passwords: [
          { validator: validatePasswords, trigger: "blur" }
        ],
        code: [
          { validator: validateCode, trigger: "blur" }
        ]
      });


      //倒计时
      let timer = ref(null);


      //登陆注册
      let menuTab = reactive([
        { txt: "登陆", current: true, type: "login" },
        { txt: "注册", current: false, type: "register" }
      ]);

      let mol = ref("login");

      //登陆按钮 属性
      let loginBtn = ref(true);

      //验证码按钮状态

      let codeBtn = reactive(
        {
          status: false,
          text: "获取验证码"
        }
      );


      // 登陆 注册 切换 高光

      const toggleMenu = ((data) => {

        menuTab.forEach((item) => {
          item.current = false;
        });
        data.current = true;


        mol.value = data.type;
        resetForm();
        //修改获取验证码按钮状态
        clearCountDown();

      });

      //清除表单数据
      const resetForm = (() => {

        // 切换登陆注册的时候 清空
        refs.loginForm.resetFields();

      });


      // 表单
      const submitForm = ((formName) => {
        refs[formName].validate((valid) => {
          if (valid) {
            //表单验证通过
            mol.value === "login" ? login() : register();
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      });


      // 登陆方法
      const login = (() => {
        let data = {
          username: ruleForm.username,
          password: sha1(ruleForm.password),
          code: ruleForm.code
        };

        root.$store.dispatch("app/login", data)
          .then((response) => {
            location.href = "/console";
            //页面跳转
            root.$router.push({
              name: "Console"
            });
          }).catch((err) => {

        });

        // Login(data).then((response) => {
        //   // location.href = "/console"
        //
        //   //页面跳转
        //   root.$router.push({
        //     name: "Console"
        //   });
        // }).catch(error => {
        //
        // });
      });

      // 注册方法

      const register = (() => {
        let requestData = {
          username: ruleForm.username,
          password: sha1(ruleForm.password),
          code: ruleForm.code
        };
        Register(requestData).then(response => {
          let data = response.data.message;
          root.$message({
            message: data,
            type: "success"
          });
          toggleMenu(menuTab[0]);
          clearCountDown();


        }).catch(error => {

        });
      });


      //获取验证码
      const getSms = (() => {
        // 判断邮箱和密码
        if (!ruleForm.username) {
          root.$message.error("邮箱不能空");
          return false;
        }
        //效验邮箱格式
        if (validateEmail(ruleForm.username)) {
          root.$message.error("邮箱格式不对");
          return false;
        }

        //修改获取验证码按钮状态
        updataBtn(true, "发送中");


        setTimeout(() => {
          GetSms({ username: ruleForm.username, module: mol.value })
            .then(response => {
              root.$message({
                message: response.data.message,
                type: "success"
              });

              //启动登陆 注册 按钮
              loginBtn.value = false;

              //定时器 倒计时
              countDown(61);


            }).catch(error => {
          });
        }, 1000);

      });

      //更新按钮的状态
      const updataBtn = ((status, txt) => {
        codeBtn.status = status;
        codeBtn.text = txt;
      });


      //倒计时

      const countDown = ((number) => {
        // 开启定时器 先清楚定时器
        if (timer.value) {
          clearInter();
        }

        let time = number;
        timer.value = setInterval(() => {
          time--;


          if (time <= -1) {
            updataBtn(false, "再次获取");
            clearInter();
          } else {
            codeBtn.text = `倒计时${time}秒`;
          }

        }, 1000);
      });


      //清楚倒计时
      const clearCountDown = (() => {
        updataBtn(false, "获取验证码");
        clearInter();
      });


      // 清除倒计时函数
      const clearInter = (() => {
        clearInterval(timer.value);
      });

      //生命周期

      // 挂载完成后
      onMounted(() => {
      });


      return {
        menuTab,
        mol,
        codeBtn,
        loginBtn,
        toggleMenu,
        submitForm,
        rules,
        ruleForm,
        getSms
      };

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