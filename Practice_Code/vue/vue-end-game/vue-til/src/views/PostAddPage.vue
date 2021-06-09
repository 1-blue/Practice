<template>
  <section id="post__add__page" class="shadow">
    <h1 class="title">Create Post</h1>
    <post-form></post-form>
  </section>
</template>

<script>
import PostForm from "@/components/PostForm.vue";

export default {
  name: "PostAddPage",
  components: {
    PostForm,
  },
};
</script>

<style scoped>
#post__add__page {
}
</style>
