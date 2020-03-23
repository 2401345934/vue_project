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
      store.commit("app/SET_TOKEN","");
      store.commit("app/SET_USERNAME","");

      next();
    } else {
      next();
    }


  } else {
    if (Router.indexOf(to.path) !== -1) {

      next();
    } else {
      next("/login");
    }
  }
});

