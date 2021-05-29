<template>
  <list-view fetchData="hacker/FETCH_ASK" state="askList"></list-view>
</template>

<script>
import ListView from '../components/ListView.vue';

export default {
  name: "AskView",
  components: {
    ListView
  }
}
</script>

<style scoped>

</style>