<template>
    <div id="header">
        <div class="fl header-icon" @click="navMenuState">
            <svg-icon iconClass="menu" className="menu"/>
        </div>
        <div class="fr ">
            <div class="user-info fl">
                <img class="img" src="../../../assets/images/7.jpg" alt=""> {{ username }}
            </div>
            <div class="header-icon fl" @click="dialogVisible = true">
                <svg-icon iconClass="exit" className="exit"/>
            </div>
        </div>

        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :modal="flag"
                :append-to-body="flag2"
                :before-close="handleClose">
            <span>确定退出吗</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="exit">确 定</el-button>
  </span>
        </el-dialog>

    </div>
</template>

<script>
  import { ref, reactive, onMounted, computed } from "@vue/composition-api";
  import store from "@/store/index";

  export default {
    name: "Header",
    setup(props, { root }) {
      const navMenuState = () => {
        root.$store.commit("app/SET_COLLAPSE");
      };
      const username = computed(() => root.$store.state.app.username);

      const flag = ref(false);
      const flag2 = ref(true);

      const exit = () => {
        root.$store.dispatch("app/exit")
          .then(() => {
            console.log(111);
            root.$router.push({
              name: "Login"
            });
          })
          .catch();
      };


      //退出弹框
      const dialogVisible = ref(false);
      const handleClose = (done) => {
        root.$confirm("确认关闭？")
          .then(_ => {
            done();


          })
          .catch(_ => {
          });
      };
      return {
        navMenuState,
        username,
        flag,
        flag2,
        exit,
        dialogVisible,
        handleClose
      };
    }
  };
</script>

<style scoped lang="scss">
    @import "../../../styles/main";

    #header {
        position: fixed;
        top: 0;
        left: $navMenu;
        background: #fff;
        height: 75px;
        right: 0;
        line-height: 75px;
        @include webkit(transition, .4s ease 0s);
        @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, .1));

        .header-icon {
            padding: 0 32px;

            svg {
                margin-bottom: -8px;
                font-size: 25px;
                cursor: pointer;

            }
        }

        .user-info {
            height: 100%;
            padding: 0 32px;
            border-right: 1px solid #ededed;

            .img {
                width: 36px;
                height: 36px;
                display: inline-block;
                border-radius: 50%;
                position: relative;
                top: 12px;
                right: 13px;
            }

            + .header-icon {
                padding: 0 28px;
            }
        }

    }

    .open {
        #header {
            left: $navMenu;
        }
    }

    .close {
        #header {
            left: $navMenuMin;
        }

    }

</style>