<template>
  <section>
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

<style scoped>
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
</style>
