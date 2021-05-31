<template>
  <list-view :pageName="pageName"></list-view>
</template>

<script>
import listMixin from '../mixins/listMixin.js';

export default {
  name: "JobsView",
  mixins: [listMixin]
}
</script>

<style scoped>

</style>