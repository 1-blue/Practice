import Vue from 'vue';
import Vuex from 'vuex';
import { init } from "../api/fetch.js";
import { getters } from './getters.js';
import { actions } from './actions.js';
import { mutations } from './mutations.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    todoItems: init(),
  },
  getters,
  actions,
  mutations,
});