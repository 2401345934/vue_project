import Vue from "vue";
import App from "./App.vue";
import VueCompositionApi from "@vue/composition-api";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./router/premit";

//定义全局方法
import { buttonPemission } from "./utils/buttonFun";


//btnPerm 是全局方法名  =  你定义的全局方法
Vue.prototype.btnPerm = buttonPemission;

//路由守卫
//定义全局方法
// import global from "@/utils/global";


//定义全局组件
import "./icons";

Vue.use(ElementUI);
// Vue.use(global);
Vue.use(VueCompositionApi);

//引入自定义指令
import "@/utils/directive";


Vue.config.productionTip = false;


// (运行时 模式)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
