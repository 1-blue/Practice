<template>
  <section id="login__form" class="shadow">
    <form @submit.prevent="submitForm" class="form">
      <ul class="form__list">
        <li>
          <label for="username">id : </label>
          <input type="text" id="username" v-model="username" class="shadow" />
        </li>
        <li>
          <label for="password">pw : </label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="shadow"
          />
        </li>
        <li>
          <button
            type="submit"
            :disabled="!isValidate"
            class="btn"
            :class="{ btn__active: isValidate }"
          >
            로그인
          </button>
        </li>
      </ul>
    </form>
  </section>
</template>

<script>
import { validateEmail } from "@/utils/validate.js";

export default {
  name: "LoginForm",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  computed: {
    isValidate() {
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
        await this.$store.dispatch("SET_LOGIN", loginData);

        this.$router.push("/main");
      } catch (error) {
        switch (error.status) {
          case 401:
            alert("비밀번호 혹은 아이디가 불일치합니다.");
            break;
          case 500:
            alert("서버측 에러입니다. 잠시후에 다시시도해주세요");
            break;
          default:
            alert(
              "알 수 없는 이유로 회원가입에 실패하셨습니다. 잠시후에 다시 시도해주세요!",
            );
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
  background: white;
  width: 300px;
}
</style>
