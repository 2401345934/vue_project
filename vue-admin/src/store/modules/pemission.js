import { setToken, setUserName } from "../../utils/app";
import { userRole } from "@/api/login";
import { routes, asyncRouter } from "@/router";
import { hasPemission } from "@/utils/EncapsulationRouterFn";

const state = {
  addRouters: [],
  allRouter: routes
};
const getters = {
  addRouters: (state) => state.addRouters,
  allRouter: (state) => state.allRouter

};
const mutations = {
  SET_ROUTER(state, router) {
    state.addRouters = router;
    state.allRouter = routes.concat(state.addRouters);
  }
};


const actions = {

  //获取用户角色
  getRoules({ commit }) {
    return new Promise((resolve, reject) => {
      //接口  token  username
      userRole().then((res) => {
        let rule = res.data.data;
        resolve(rule);
      }).catch(() => {
        reject();
      });
    });
  },
  //创建动态路由
  createRouter({ commit }, data) {
    return new Promise((resolve, reject) => {
      let rols = data;
      let addRouters = [];
      //超级管理原
      if (rols.includes("admin")) {
        addRouters = asyncRouter;
      } else {

        addRouters = asyncRouter.filter((item) => {
          if (hasPemission(rols, item)) {

            if (item.children && item.children.length > 0) {

              item.children = item.children.filter((i) => {
                if (hasPemission(rols, i)) {
                  return i;
                }
              });
            }
            return item;
          }
        });

        //这是系统分配
        // addRouters =  asyncRouter.filter((item) => {
        // if (rols.includes(item.meta.system)) {
        //   return item;
        // }
        // });
      }
      commit("SET_ROUTER", addRouters);
      resolve();
    });
  }


};


export default {
  namespaced: true,
  getters,
  state,
  mutations,
  actions
};