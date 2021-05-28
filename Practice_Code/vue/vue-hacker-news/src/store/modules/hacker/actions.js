import { fetchNews, fetchAsk, fetchJobs } from '../../../api/index.js';

export const actions = {
  async FETCH_NEWS({ commit }){
    try {
      const data = await fetchNews();
      commit("fetchNews", data);
    } catch (error) {
      commit("fetchNews", error);
    }
  },
  async FETCH_ASK({ commit }){
    try {
      const data = await fetchAsk();
      commit("fetchAsk", data);
    } catch (error) {
      commit("fetchAsk", error);
    }
  },
  async FETCH_JOBS({ commit }){
    try {
      const data = await fetchNews();
      commit("fetchjobs", data);
    } catch (error) {
      commit("fetchjobs", error);
    }
  }
}