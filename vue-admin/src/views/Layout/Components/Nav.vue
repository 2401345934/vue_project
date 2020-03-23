<template>
    <div id="nav">
        <h1 class="logo"><img src="../../../assets/images/6.jpg" alt=""></h1>
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo"
                 :collapse="isCollapse" background-color="transparent" text-color="#fff" active-text-color="#fff"
                 router>

            <template v-for="(item , index) in routers">
                <el-submenu :index="index + ''" :key="item.id" v-if="!item.hidden">

                    <!--一级菜单-->
                    <template slot="title">
                        <svg-icon :iconClass="item.meta.icon" :className="item.meta.name"></svg-icon>
                        <span slot="title">{{ item.meta.name }}</span>
                    </template>
                    <!--子级菜单-->
                    <el-menu-item :index="submit.path" v-for="(submit,index) in item.children" :key="submit.id">{{
                        submit.meta.name }}
                    </el-menu-item>
                </el-submenu>
            </template>

        </el-menu>
    </div>
</template>

<script>
  import { ref, reactive, onMounted, computed } from "@vue/composition-api";

  export default {
    name: "Nav",
    setup(props, { root }) {

      // /数据/
      const routers = reactive(root.$router.options.routes);
      // computed  监听
      const isCollapse = computed(() => root.$store.state.app.isCollapse);
      return {
        isCollapse,
        routers
      };
    }
  };
</script>

<style scoped lang="scss">
    @import "../../../styles/main";

    #nav {
        position: fixed;
        width: $navMenu;
        left: 0;
        top: 0;
        height: 100vh;
        background: #344a5f;
        @include webkit(transition, .4s ease 0s);

        svg {
            font-size: 20px;
            margin-right: 10px;
        }

        .logo {
            text-align: center;
            img {
                width: 92px;
                margin: 28px auto 25px;
                opacity: .6;
                height: 92px;
                border-radius: 50%;
                @include webkit(transition, .3s ease 0s);
            }
        }
    }

    .el-menu {
        border-right: 0;
    }

    .open {
        #nav {
            width: $navMenu;
        }
    }

    .close {
        #nav {
            width: $navMenuMin;
        }

        .logo img {
            width: 60% !important;
            margin:  28px auto !important;
            height: 60px !important;
        }
    }

</style>