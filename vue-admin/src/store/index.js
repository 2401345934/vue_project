import Vue from "vue";
import Vuex from "vuex";

import app from "./modules/app";
import common from "./modules/common"
import { GetSms, Register, Login } from "@/api/login";

Vue.use(Vuex);

export default new Vuex.Store({

  modules: {
    app,
    common
  }
});
