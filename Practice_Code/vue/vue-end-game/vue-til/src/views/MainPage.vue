<template>
  <section id="main__page">
    <h1 class="title">Today I Learn</h1>
    <loading-spinner v-if="isLoading">로딩중...</loading-spinner>
    <ul v-else>
      <post-list-item
        @refresh="fetchData"
        v-for="postItem in postItems"
        :key="postItem._id"
        :postItem="postItem"
      ></post-list-item>
    </ul>

    <router-link to="/add" class="link__add shadow" v-show="isLogin">
      <span class="link__add__text">+</span>
    </router-link>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { fetchPosts } from "@/api/posts.js";
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";
import PostListItem from "@/components/PostListItem.vue";

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
    };
  },
  computed: {
    ...mapGetters(["isLogin"]),
  },
  created() {
    if (this.isLogin) {
      this.fetchData();
    }
  },
  methods: {
    async fetchData() {
      try {
        this.isLoading = true;
        const { data } = await fetchPosts();
        this.postItems = data.posts;
        this.isLoading = false;
      } catch (error) {
        switch (error.response.status) {
          case 401:
            alert(
              "인증 토큰이 유효하지 않아 게시물을 받아올 수 없습니다. 로그인정보를 확인해주세요",
            );
            break;
          case 500:
            alert("서버측 에러입니다. 잠시후에 다시시도해주세요");
            break;
          default:
            alert(
              "알 수 없는 이유로 게시글 받아오기에 실패하셨습니다. 새로 고침 후에도 에러가 지속되면 다시 로그인해 주세요",
            );
            break;
        }
      }
    },
  },
};
</script>

<style scoped>
#main__page {
}

.link__add {
  position: fixed;
  top: 85%;
  left: 90%;
  width: 46.5px;
  height: 46.5px;
  background: #f38416;
  border: 3.5px solid white;
  border-radius: 50%;
}

.link__add:hover {
  text-decoration: none;
}

.link__add__text {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 1.8rem;
  font-weight: bold;
  color: white;
  transform: translate(-50%, -60%);
}
</style>
