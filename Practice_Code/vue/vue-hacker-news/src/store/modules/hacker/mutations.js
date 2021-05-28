export const mutations = {
  fetchNews(state, data){
    state.newsList = data;
  },
  fetchAsk(state, data){
    state.askList = data;
  },
  fetchjobs(state, data){
    state.jobList = data;
  }
}