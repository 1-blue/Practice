import { mutations } from './mutations.js';
import { actions } from './actions.js';

export const hacker = {
  namespaced: true,
  state: {
    newsList: [],
    askList: [],
    jobList: [],
    userInfo: {},
    item: {}
  },
  mutations,
  actions
}