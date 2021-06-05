<template>
  <section id="signup__page">
    <h1>회원가입</h1>
    <signup-form></signup-form>
  </section>
</template>

<script>
import SignupForm from "@/components/SignupForm.vue";

export default {
  name: "SignupPage",
  components: {
    SignupForm,
  },
};
</script>

<style scoped>
#signup__page {
}
</style>
