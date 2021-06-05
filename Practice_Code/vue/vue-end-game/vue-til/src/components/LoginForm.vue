<template>
  <section id="login__form">
    <form @submit.prevent="submitForm">
      <div>
        <label for="username">id : </label>
        <input type="text" id="username" v-model="username" />
      </div>
      <div>
        <label for="password">pw : </label>
        <input type="password" id="password" v-model="password" />
      </div>
      <button type="submit" :disabled="!isValid">로그인</button>
    </form>
    <p>{{ logMessage }}</p>
  </section>
</template>

<script>
import { loginUser } from "@/api/index.js";
import { validateEmail } from "@/utils/validate.js";

export default {
  name: "LoginForm",
  data() {
    return {
      username: "",
      password: "",
      logMessage: "",
    };
  },
  computed: {
    isValid() {
      return validateEmail(this.username) && this.password;
    },
  },
  methods: {
    async submitForm() {
      const loginData = {
        username: this.username,
        password: this.password,
      };

      try {
        const { data } = await loginUser(loginData);
        this.logMessage = `${data.user.nickname}님 로그인에 성공하셨습니다.`;
      } catch (error) {
        switch (error.status) {
          case 401:
            this.logMessage = "비밀번호가 불일치합니다.";
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

      this.initForm();
    },
    initForm() {
      this.username = "";
      this.password = "";
    },
  },
};
</script>

<style scoped>
#login__form {
}
</style>
