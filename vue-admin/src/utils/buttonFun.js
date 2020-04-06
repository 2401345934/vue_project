import store from "../store/index";

export function buttonPemission(pemission) {
  if (store.state.app.rules.indexOf("admin") != -1) {
    return true;
  } else {
    return store.getters["app/btnPerm"].indexOf(pemission) != -1;
  }

}