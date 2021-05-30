import { fetchNews, fetchAsk, fetchJobs, fetchUserInfo, fetchItem } from '../../../api/index.js';

export const actions = {
  async FETCH_NEWS({ commit }){
    try {
      const data = await fetchNews();
      commit("SET_NEWS_LIST", data);
    } catch (error) {
      commit("SET_NEWS_LIST", error);
    }

    return "fetched";
  },
  async FETCH_ASK({ commit }){
    try {
      const data = await fetchAsk();
      commit("SET_ASK_LIST", data);
    } catch (error) {
      commit("SET_ASK_LIST", error);
    }

    return "fetched";
  },
  async FETCH_JOBS({ commit }){
    try {
      const data = await fetchJobs();
      commit("SET_JOB_LIST", data);
    } catch (error) {
      commit("SET_JOB_LIST", error);
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