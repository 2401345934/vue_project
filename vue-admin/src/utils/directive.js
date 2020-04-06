import Vue from "vue";
import store from "../store";

Vue.directive("btnPerm",{
  bind: (el,binding,vnode) => {
    if (binding.def.hasBtnPerm(binding.value)) {
      el.style.display = "inline-block"
    } else {
      el.style.display = "none"
    }
  },
  hasBtnPerm(permission) {
    if (store.state.app.rules.indexOf("admin") != -1) {
      return true;
    } else {
      return store.getters["app/btnPerm"].indexOf(permission) != -1;
    }
  },
  inserted:(el,binding,vnode) => {

  },
  update:(el,binding,vnode) => {

  },
  componentUpdated:(el,binding,vnode) => {

  },
  unbind:(el,binding,vnode) => {

  },


})