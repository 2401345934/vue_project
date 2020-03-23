<template>
    <div id="layout" :class="[menuStatus ? 'close' : 'open']">
        <LayoutHeader />
        <LayoutMain />
        <LayoutNav />
    </div>
</template>

<script>
  import { ref , reactive , onMounted ,computed} from "@vue/composition-api";
  import LayoutHeader from "./Components/Header";
  import LayoutMain from "./Components/Main";
  import LayoutNav from "./Components/Nav";
  export default {
    name: "layout",
    components: {
      LayoutHeader,LayoutMain,LayoutNav
    },
    setup(props , { root }) {

      const menuStatus = computed(() => root.$store.state.app.isCollapse)


      return {
        menuStatus
      }
    }
  };
</script>

<style scoped lang="scss">
#layout {
    background: #f7f7f7;


}
</style>