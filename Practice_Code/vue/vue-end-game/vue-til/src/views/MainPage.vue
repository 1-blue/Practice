<template>
  <section id="main__page">
    <h1>Today I Learn</h1>
    <loading-spinner v-if="isLoading">로딩중...</loading-spinner>
    <ul v-else>
      <post-list-item
        v-for="postItem in postItems"
        :key="postItem._id"
        :postItem="postItem"
      ></post-list-item>
    </ul>
  </section>
</template>

<script>
import { fetchPosts } from "@/api/index.js";
import PostListItem from "@/components/PostListItem.vue";
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";

export default {
  name: "MainPage",
  components: {
    PostListItem,
    LoadingSpinner,
  },
  data() {
    return {
      postItems: [],
      isLoading: false,
      logMessage: "",
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        this.isLoading = true;
        const { data } = await fetchPosts();
        this.postItems = data.posts;
        this.isLoading = false;
      } catch (error) {
        switch (error.status) {
          case 400:
            this.logMessage = "이미 존재하는 게시글입니다.";
            break;
          case 500:
            this.logMessage = "서버측 에러입니다. 잠시후에 다시시도해주세요";
            break;
          default:
            this.logMessage =
              "알 수 없는 이유로 회원가입에 실패하셨습니다. 잠시후에 다시 시도해주세요!";
            break;
        }
      }
    },
  },
};
</script>

<style scoped>
#main__page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
