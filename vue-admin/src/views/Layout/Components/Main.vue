<template>
  <div id="main">
    <div class="main-content">
      <div class="content">

        <keep-alive include="infoIndex" max="5">
          <!--需要缓存  根据路由的meta.keepAlice 判断这个组件需要不需要缓存-->
          <router-view v-if="$route.meta.keepAlive" />
        </keep-alive>
        <!--不需要缓存-->
        <router-view v-if="!$route.meta.keepAlive" />

      </div>
    </div>

  </div>
</template>

<script>

  export default {
    name: "Main"
  };
</script>

<style scoped lang="scss">
  @import "../../../styles/main";

  #main {
    height: 100vh;
    /*position: fixed;*/
    /*<!--left: $navMenu;-->*/
    /*top: 75px;*/
    /*bottom: 0;*/
    /*right: 0;*/
    /*border: 30px solid #f7f7f7;*/
    /*border-bottom: none;*/
    /*-webkit-box-sizing: border-box;*/
  }

  .main-content {
    width: 100%;
    height: 100%;
    padding-top: $layoutHeader + 30;
    padding-left: $navMenu + 30;
    padding-right: 30px;
    @include webkit(box-sizing, border-box);
    @include webkit(transition, all .4s ease 0s);
  }

  .open {
    .main-content {
      padding-left: $navMenu + 30;
    }
  }

  .close {
    .main-content {
      padding-left: $navMenuMin + 30;
    }
  }

  .content {
    width: 100%;
    height: 100%;
    padding: 30px 30px 0 30px;
    background-color: #fff;
    @include webkit(box-sizing, border-box);
    @include webkit(transition, all .4s ease 0s);
  }

</style>