<template>
  <section id="App">
    <app-header></app-header>
    <router-view></router-view>
  </section>
</template>

<script>
import AppHeader from "@/components/common/AppHeader.vue";

export default {
  name: "App",
  components: {
    AppHeader,
  },
};
</script>

<style>
@import "./css/reset.css";
@import "./css/common.css";
</style>
