import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


new Vue({
  el: "#app",
  delimiters: ["${", "}"],
  render: h => h(App),
});