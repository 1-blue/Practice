import Vue from "vue";
import Vuex from "vuex";
import {
  getToken,
  getNickname,
  clearToken,
  clearNickname,
} from "@/utils/cookie.js";
import { loginUser } from "@/api/auth.js";
import { setToken, setUserNickname } from "@/utils/cookie.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: getToken() || "",
    nickname: getNickname() || "",
  },
  getters: {
    isLogin(state) {
      return state.nickname !== "";
    },
  },
  mutations: {
    setNickname(state, nickname) {
      state.nickname = nickname;
    },
    setToken(state, token) {
      state.token = token;
    },
    clearToken(state) {
      state.token = "";
      clearToken(state.token);
    },
    clearNickname(state) {
      state.nickname = "";
      clearNickname(state.nickname);
    },
  },
  actions: {
    async SET_LOGIN({ commit }, loginData) {
      // 로그인정보 가져오기
      const { data } = await loginUser(loginData);

      // store에 데이터 추가
      commit("setNickname", data.user.nickname);
      commit("setToken", data.token);

      //  cookie에 데이터 추가
      setToken(data.token);
      setUserNickname(data.user.nickname);

      return data;
    },
  },
});
