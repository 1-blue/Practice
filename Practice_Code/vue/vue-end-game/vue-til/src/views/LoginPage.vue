<template>
  <section id="login__page">
    <h1 class="title">로그인페이지</h1>
    <login-form></login-form>
  </section>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "LoginPage",
  components: {
    LoginForm,
  },
};
</script>

<style scoped>
#login__page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
