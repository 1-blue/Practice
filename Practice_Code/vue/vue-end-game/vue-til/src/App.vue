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
body {
  margin: 0;
  background: #f5f4f8;
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
input:focus {
  outline: 1px solid blue;
}

.shadow {
  box-shadow: 0px 0px 3px gray;
}
</style>
