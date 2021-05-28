import Vue from 'vue';
import App from './App.vue';
import { router } from './routes/index.js';
import { store } from './store/store.js';

Vue.config.productionTip = false;

// router/index.js에서 라우터사용정의

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
