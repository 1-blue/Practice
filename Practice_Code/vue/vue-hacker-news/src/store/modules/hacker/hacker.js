import { mutations } from './mutations.js';
import { actions } from './actions.js';

export const hacker = {
  namespaced: true,
  state: {
    list: [],
    userInfo: {},
    item: {}
  },
  mutations,
  actions
}