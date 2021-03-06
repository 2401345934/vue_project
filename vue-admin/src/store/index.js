import Vue from "vue";
import Vuex from "vuex";

import app from "./modules/app";
import pemission from "./modules/pemission";
import common from "./modules/common";
import infoDetailed from "./modules/infoDetailed";
import { GetSms, Register, Login } from "@/api/login";

Vue.use(Vuex);

export default new Vuex.Store({

  modules: {
    app,
    common,
    infoDetailed,
    pemission
  }
});
