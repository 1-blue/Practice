<template>
  <list-view fetchData="hacker/FETCH_NEWS" state="newsList"></list-view>
</template>

<script>
import ListView from "../components/ListView.vue";

export default {
  name: "NewsView",
  components: {
    ListView
  }
}
</script>

<style scoped>

</style>