<template>
  <li class="post shadow">
    <h2 class="post__title">{{ postItem.title }}</h2>
    <div class="post__content">{{ postItem.contents }}</div>
    <div class="post__rename">
      <span class="post__time">{{ postItem.createdAt | formatDate }}</span>
      <i class="fas fa-trash icon__delete" @click="deletePost"></i>
      <i class="fas fa-pen icon__modify" @click="routerEditPost"></i>
    </div>
  </li>
</template>

<script>
import { deletePosts } from "@/api/posts";

export default {
  name: "PostListItem",
  props: {
    postItem: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async deletePost() {
      try {
        await deletePosts(this.postItem._id);
        this.$emit("refresh");
      } catch (error) {
        switch (error.reponse.status) {
          case 400:
            alert("게시물을 삭제할 수 업습니다.");
            break;
          case 404:
            alert("게시물을 찾을 수 없습니다.");
            break;
          case 500:
            alert("서버에 문제가 있습니다. 잠시후에 다시 시도해 주세요");
            break;

          default:
            alert("알 수 없는 에러");
            break;
        }
      }
    },
    routerEditPost() {
      this.$router.push(`/edit/${this.postItem._id}`);
    },
  },
};
</script>

<style>
.post {
  display: inline-flex;
  flex-direction: column;
  width: 96%;
  height: 250px;
  padding: 1rem 1rem 0.2rem;
  margin: 2%;
  border-radius: 10px;
  background: white;
}

.post__title {
  font-weight: bold;
  text-align: center;
  margin-top: 0;
}

.post__content {
  flex-grow: 1;
}

.post__rename {
  font-size: 0.3em;
  text-align: end;
  color: grey;
}

.post__rename > * {
  margin: 0 1em;
}

@media screen and (min-width: 768px) {
  .post {
    width: 46%;
  }
}
</style>
