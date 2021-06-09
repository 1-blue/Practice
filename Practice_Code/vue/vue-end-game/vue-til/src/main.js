import Vue from "vue";
import App from "./App.vue";
import router from "@/routes/index.js";
import store from "@/store/index.js";
import { formatDate } from "@/utils/filter.js";

Vue.config.productionTip = false;
Vue.filter("formatDate", formatDate);

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount("#app");
