<template>
  <section id="page__edit__page">
    <h1 class="title">Edit Post</h1>
    <post-form></post-form>
  </section>
</template>

<script>
import PostForm from "@/components/PostForm.vue";

export default {
  name: "PostEditPage",
  components: {
    PostForm,
  },
};
</script>

<style scode>
#page__edit__page {
}
</style>
