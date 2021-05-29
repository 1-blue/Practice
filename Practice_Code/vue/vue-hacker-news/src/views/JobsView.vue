<template>
  <list-view fetchData="hacker/FETCH_JOBS" state="jobList"></list-view>
</template>

<script>
import ListView from "../components/ListView.vue";

export default {
  name: "JobsView",
  components: {
    ListView
  }
}
</script>

<style scoped>

</style>