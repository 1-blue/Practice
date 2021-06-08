<template>
  <section id="app__header">
    <router-link to="/">
      <span class="title">TIL</span>
    </router-link>
    <div class="links">
      <template v-if="isLogin">
        <span class="login__user__name">{{ username }}</span>
        <a @click.prevent="logout" class="logout__link">로그아웃</a>
      </template>
      <template v-else>
        <router-link to="/login">로그인</router-link>
        <router-link to="/signup">회원가입</router-link>
      </template>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "AppHeader",
  computed: {
    ...mapState({
      username: "username",
    }),
    ...mapGetters({
      isLogin: "isLogin",
    }),
  },
  methods: {
    ...mapMutations({
      clearToken: "clearToken",
      clearUsername: "clearNickname",
    }),
    logout() {
      this.clearToken();
      this.clearUsername();
    },
  },
};
</script>

<style scoped>
#app__header {
  background: #8871fe;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}

.login__user__name {
  color: white;
}

.logout__link {
  cursor: pointer;
}

.links > a {
  font-size: 1rem;
  font-weight: bold;
  color: white;
  margin: 0px 10px;
}

.links > .router-link-active {
  color: lightgray;
}
</style>
