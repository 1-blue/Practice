<template>
  <div id="app">
    <tool-bar></tool-bar>
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <Spinner :spinnerStatus="spinnerStatus" />
  </div>
</template>

<script>
import ToolBar from './components/ToolBar.vue';
import Spinner from './components/Spinner.vue';
import bus from './utils/bus.js';

export default {
  name: 'App',
  components: {
    ToolBar,
    Spinner
  },
  data(){
    return{
      spinnerStatus: false
    }
  },
  created(){
    bus.$on("start:spinner", this.startSpinner);
    bus.$on("end:spinner", this.endSpinner);
  },
  beforeDestroy(){
    bus.$off("start:spinner");
    bus.$off("end:spinner");
  },
  methods: {
    startSpinner(){
      this.spinnerStatus = true;
    },
    endSpinner(){
      this.spinnerStatus = false;
    }
  }
}
</script>

<style>
body {
  margin: 0;
}
ul {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
a {
  text-decoration: none;
  color: black;
}
a:visited {
  color: black;
}
a:hover {
  text-decoration: underline;
}

.fade-enter, .fade-leave-to{
  opacity: 0;
}
.fade-enter-to, .fade-leave{
  opacity: 1;
}
.fade-enter-active, .fade-leave-active{
  transition: all 0.5s;
}
</style>
