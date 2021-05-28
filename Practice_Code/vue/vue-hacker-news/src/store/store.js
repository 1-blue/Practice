import Vue from 'vue';
import Vuex from 'vuex';

import { hacker } from './modules/hacker/hacker.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    hacker
  }
});