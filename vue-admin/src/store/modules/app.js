import { GetSms, Register, Login } from "@/api/login";
import { setToken, setUserName , getUserName ,removeToken , removeUserName} from "../../utils/app";
import store from "../index";

const state = {
  isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,
  token: "",
  username: getUserName("username")  || "",
  rules: [],
  buttonArr:[],
  btnPerm: []
};
const getters = {
  isCollapse: (state) => state.isCollapse,
  rules: (state) => state.rules,
  buttonArr: (state) => state.buttonArr,
  btnPerm: (state) => state.btnPerm,
};
const mutations = {
  SET_COLLAPSE(state) {
    state.isCollapse = !state.isCollapse;
    //H5 存储
    sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
  },
  SET_TOKEN(state, value) {
    state.token = value;
  },
  SET_USERNAME(state, value) {
    state.username = value;
  },
  SET_RULES(state, value) {
    state.rules = value;
  },
  SET_BUTTONARR(state, value) {
    state.buttonArr = value;
  },
  SET_BTNPERM(state, value) {
    state.btnPerm = value;
  },
};


const actions = {
  login({ commit }, data) {
    return new Promise((resolve, reject) => {
      //接口  token  username

      Login(data).then((response) => {
        let date = response.data.data;
        console.log(date);
        commit("SET_TOKEN", date.token);
        commit("SET_USERNAME", date.username);
        setToken(date.token);
        setUserName(date.username);

        resolve(response);
      }).catch((err) => {
        reject(err);
      });
    });
  },

  //退出
  exit( {commit}) {
    return new Promise((resolve,reject) => {
      removeToken();
      removeUserName();
      commit("SET_TOKEN","");
      commit("SET_USERNAME","");
      commit("SET_RULES",[]);
      resolve()
    })
  }
};


export default {
  namespaced: true,
  getters,
  state,
  mutations,
  actions
};