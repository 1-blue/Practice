import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.directive("my", {
  bind(a, b, c){
    console.log("bind");
    console.log("최초 바인딩된경우 한번만 호출");
    console.log(a);
    console.log(b);
    console.log(c);
  },
  inserted(){
    console.log("inserted");
    console.log("부모노드에 삽입되었을 경우 호출");
  },
  update(){
    console.log("update");
    console.log("포함하는 컴포넌트가 업데이트된후 호출");
  },
  componentUpdated(){
    console.log("componentUpdated");
    console.log("포함하는 컴포넌트와 그 자식들이 업데이트된후 호출");
  },
  unbind(){
    console.log("unbind");
    console.log("언바인딩된경우 호출");   
  }
});

Vue.filter("test", function(value){
  if(typeof value !== "string")   return;

  return value.toUpperCase();
});


new Vue({
  render: h => h(App),
}).$mount('#app')