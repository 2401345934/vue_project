import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
//引入布局组件

import Layout from "@/views/Layout";

export const routes = [
  {
    path: "/",
    redirect: "console",
    hidden: true,
    meta: {
      name: "主页"
    }
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    meta: {
      name: "登陆"
    },
    component: () => import("../views/Login/index.vue")
  },
  {
    path: "/console",
    name: "Console",
    redirect: "index",
    meta: {
      name: "控制台",
      icon: "console"

    },
    component: Layout,
    children: [
      {
        path: "/index",
        name: "Index",
        meta: {
          name: "首页"
        },
        component: () => import("../views/Console/index.vue")
      }
    ]

  }
  // {
  //   path: "/info",
  //   name: "Info",
  //   meta: {
  //     name: "信息管理",
  //     icon: "info"
  //
  //   },
  //   component: Layout,
  //   children: [
  //     {
  //       path: "/infoIndex",
  //       name: "InfoIndex",
  //       meta: {
  //         name: "信息列表"
  //       },
  //       component: () => import("../views/Info/index.vue")
  //     },
  //     {
  //       path: "/information",
  //       name: "Information",
  //       meta: {
  //         name: "信息分类"
  //       },
  //       component: () => import("../views/Info/information.vue")
  //     },
  //     {
  //       path: "/infoDetailed/",
  //       name: "InfoDetailed",
  //       hidden: true,
  //       meta: {
  //         name: "信息详情"
  //       },
  //       component: () => import("../views/Info/infoDetailed.vue")
  //     }
  //   ]
  //
  // },
  // {
  //   path: "/user",
  //   name: "User",
  //   meta: {
  //     name: "用户管理",
  //     icon: "user"
  //   },
  //   component: Layout,
  //   children: [
  //     {
  //       path: "/userIndex",
  //       name: "UserIndex",
  //       meta: {
  //         name: "用户列表"
  //       },
  //       component: () => import("../views/User/index.vue")
  //     }
  //   ]
  //
  // }


];


export default new VueRouter({
  routes,
  asyncRouter
});
//动态路由
//,
export const asyncRouter = [

  {
    path: "/info",
    name: "Info",
    meta: {
      name: "信息管理",
      icon: "info",
      system: "信息功能",
      role: ["技术员", "业务员"]
    },
    component: Layout,
    children: [
      {
        path: "/infoIndex",
        name: "InfoIndex",
        meta: {
          keepAlive:true,
          name: "信息列表",
          role: ["技术员", "业务员"]
        },
        component: () => import("../views/Info/index.vue")
      },
      {
        path: "/information",
        name: "Information",
        meta: {
          name: "信息分类",
          role: ["业务员"]
        },
        component: () => import("../views/Info/information.vue")
      },
      {
        path: "/infoDetailed/",
        name: "InfoDetailed",
        hidden: true,
        meta: {
          name: "信息详情",
          role: ["技术员", "业务员"]

        },
        component: () => import("../views/Info/infoDetailed.vue")
      }
    ]

  },
  {
    path: "/user",
    name: "User",
    meta: {
      name: "用户管理",
      icon: "user",
      system: "用户功能",
      role: ["部门经理"]

    },
    component: Layout,
    children: [
      {
        path: "/userIndex",
        name: "UserIndex",
        meta: {
          name: "用户列表",
          role: ["部门经理"]
        },
        component: () => import("../views/User/index.vue")
      }
    ]

  }


];


