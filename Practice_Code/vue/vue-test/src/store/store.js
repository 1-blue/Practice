import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const moduleA = {
  state: {
    data: 10,
  },
  mutations: {
    a(state){
      state.data++;
      console.log("A-mutations");
    }
  },
  actions: {

  },
  getters: {
    double1(state){
      return state.data * 2;
    }
  }
}

const moduleB = {
  namespaced: true,
  state: {
    data: 20
  },
  mutations: {
    a(state){
      state.data++;
      console.log("B-mutations");
    }
  },
  actions: {
    test(context){
      console.log(context.rootState);
      console.log(context.state);
    }
  },
  getters: {
    double(state){
      return state.data * 2;
    }
  },
  modules: {
    child: {
      namespaced: true,
      state: {
        data: 111,
      },
      actions: {
        childAction(context){
          console.log("childAction");
          console.log(context);
        }
      },
      mutations: {
        childMutation(state, getters, rootState, rootGetters, temp){
          console.log("=======================");
          console.log(state);
          console.log(getters);
          console.log(rootState);
          console.log(rootGetters);
          console.log(temp);
        }
      }
    }
  }
}


export const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB,
  }
});