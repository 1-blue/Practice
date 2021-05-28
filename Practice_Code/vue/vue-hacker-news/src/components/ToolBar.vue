<template>
  <section id="tool__bar">
    <ul class="link__container">
      <li>
        <router-link to="/news">NEWS</router-link>
      </li>
      <li>
        <router-link to="/ask">ASK</router-link>
      </li>
      <li>
        <router-link to="jobs">JOBS</router-link>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "ToolBar"
}
</script>

<style scoped>
#tool__bar {
  display: flex;
  justify-content: center;
  background: #42b883;
  padding: 10px;
}
.link__container {
  display: flex;
}
.link__container > li {
  margin: 0 20px;
}
.router-link-active {
  color: #35495e;
}
</style>