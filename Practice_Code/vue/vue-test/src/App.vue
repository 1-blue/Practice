<template>
  <div id="app">
    <base-component :fruit="fruit">
      <h1>안녕하세여</h1>
      <h3>App에서 작성중 {{ fruit }}</h3>
    </base-component>
  </div>
</template>

<script>
import BaseComponent from './components/BaseComponent.vue';

export default {
  name: 'App',
  components: {
    BaseComponent
  },
  data(){
    return{
      fruit: "apple",
    }
  }
}
</script>

<style>
#app{
  background: gray;
  width: 100%;
  height: 100%;
}


</style>
