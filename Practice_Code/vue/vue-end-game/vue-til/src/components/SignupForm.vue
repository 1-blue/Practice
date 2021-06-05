<template>
  <section id="signup__form">
    <form @submit.prevent="submitForm">
      <div>
        <label for="username">id : </label>
        <input type="text" id="username" v-model="username" />
      </div>
      <div>
        <label for="password">pw : </label>
        <input type="password" id="password" v-model="password" />
      </div>
      <div>
        <label for="nickname">nickname : </label>
        <input type="text" id="nickname" v-model="nickname" />
      </div>
      <button type="submit">회원가입</button>
    </form>

    <p>{{ logMessage }}</p>
  </section>
</template>

<script>
import { registerUser } from "@/api/index.js";

export default {
  name: "SignupForm",
  data() {
    return {
      username: "",
      password: "",
      nickname: "",
      logMessage: "",
    };
  },
  methods: {
    async submitForm() {
      const userData = {
        username: this.username,
        password: this.password,
        nickname: this.nickname,
      };

      try {
        const { data } = await registerUser(userData);
        this.logMessage = `${data.username}님 회원가입에 성공하셨습니다.`;
      } catch (error) {
        switch (error.message) {
          case "409":
            this.logMessage = "중복된 아이디입니다. 아이디를 교체하고 다시시도해주세요";
            break;
          case "500":
            this.logMessage = "서버측 에러입니다. 잠시후에 다시시도해주세요";
            break;
          default:
            this.logMessage = "알 수 없는 이유로 회원가입에 실패하셨습니다. 잠시후에 다시 시도해주세요!";
            break;
        }
      }

      this.initForm();
    },
    initForm() {
      this.username = "";
      this.password = "";
      this.nickname = "";
    },
  },
};
</script>

<style scoped>
#signup__form {
}
</style>
