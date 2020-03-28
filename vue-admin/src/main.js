import Vue from "vue";
import App from "./App.vue";
import VueCompositionApi from "@vue/composition-api";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./router/premit";

//路由守卫
//定义全局方法
// import global from "@/utils/global";


//定义全局组件
import "./icons";

Vue.use(ElementUI);
// Vue.use(global);
Vue.use(VueCompositionApi);


Vue.config.productionTip = false;


// (运行时 模式)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
