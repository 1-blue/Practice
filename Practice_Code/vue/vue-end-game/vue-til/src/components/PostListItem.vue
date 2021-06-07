<template>
  <li class="post shadow">
    <h2 class="post__title">{{ postItem.title }}</h2>
    <div class="post__content">{{ postItem.contents }}</div>
    <div class="post__time">{{ postItem.createdAt }}</div>
  </li>
</template>

<script>
export default {
  name: "PostListItem",
  props: {
    postItem: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
.post {
  background: white;
  width: 300px;
  height: 200px;
  padding: 1rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}

.post__title {
  font-weight: bold;
  text-align: center;
  margin-top: 0;
}

.post__content {
  flex-grow: 1;
}

.post__time {
  font-size: 0.3em;
  text-align: end;
  color: grey;
}
</style>
