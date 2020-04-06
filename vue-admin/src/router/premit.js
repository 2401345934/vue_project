import router from "./index";
import { getToken, removeToken, removeUserName } from "../utils/app";
import store from "../store/index";

//路由守卫
const Router = ["/login"];


router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path === "/login") {
      removeToken();
      removeUserName();
      store.commit("app/SET_TOKEN", "");
      store.commit("app/SET_USERNAME", "");

      next();
    } else {

      //分配权限        //获取
      if (store.getters["app/rules"].length === 0) {
        store.dispatch("pemission/getRoules").then((res) => {
           //代表成功了
          let rols = res.role;
          let buttonS = res.button;
          let btnPerm = res.btnPerm
          console.log(res);
          //修改
          store.commit("app/SET_RULES", rols);
          store.commit("app/SET_BUTTONARR", buttonS);
          store.commit("app/SET_BTNPERM", btnPerm);
          store.dispatch("pemission/createRouter", rols).then((res) => {
            let addRouters = store.getters["pemission/addRouters"];
            let allRouters = store.getters["pemission/allRouter"];

            //更新路由
            router.options.routes = allRouters;
            //  添加动态路由
            router.addRoutes(addRouters);
            next({ ...to, replace: true });  //不会有历史记录 replace:true
          });
        });
      } else {
        next();
      }

    }


  } else {
    if (Router.indexOf(to.path) !== -1) {

      next();
    } else {
      next("/login");
    }
  }
});

