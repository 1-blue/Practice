export const mutations = {
  SET_NEWS_LIST(state, data){
    state.newsList = data;
  },
  SET_ASK_LIST(state, data){
    state.askList = data;
  },
  SET_JOB_LIST(state, data){
    state.jobList = data;
  },
  SET_USER_INFO(state, data){
    state.userInfo = data;
  },
  SET_ITEM(state, data){
    state.item = data;
  }
}