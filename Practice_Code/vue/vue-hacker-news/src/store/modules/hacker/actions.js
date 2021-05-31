import { fetchList, fetchUserInfo, fetchItem } from '../../../api/index.js';

export const actions = {
  async FETCH_LIST({ commit }, name){
    try {
      const data = await fetchList(name);
      commit("SET_LIST", data);
    } catch (error) {
      commit(`SET_LIST`, error);
    }

    return "fetched";
  },
  async FETCH_USER_INFO({ commit }, username){
    try {
      const data = await fetchUserInfo(username);
      commit("SET_USER_INFO", data);
    } catch (error) {
      commit("SET_USER_INFO", error);
    }

    return "fetched";
  },
  async FETCH_ITEM({ commit }, id){
    try {
      const data = await fetchItem(id);
      commit("SET_ITEM", data);
    } catch (error) {
      commit("SET_ITEM", error);
    }

    return "fetched";
  }
}