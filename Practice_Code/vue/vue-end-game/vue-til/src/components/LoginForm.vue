<template>
  <section id="login__form" class="shadow">
    <form @submit.prevent="submitForm" class="login__form">
      <div>
        <label for="username">id : </label>
        <input type="text" id="username" v-model="username" class="shadow" />
      </div>
      <div>
        <label for="password">pw : </label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="shadow"
        />
      </div>
      <button
        type="submit"
        :disabled="!isValid"
        class="login__btn"
        :class="{ login__btn__active: isValid }"
      >
        로그인
      </button>
    </form>
    <p>{{ logMessage }}</p>
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
        await this.$store.dispatch("SET_LOGIN", loginData);

        this.$router.push("/main");
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
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
}

input {
  width: 225px;
  height: 25px;
  border: 1px solid lightblue;
}
label {
  margin-bottom: 5px;
}

.login__form > div {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.login__btn {
  width: 80px;
  height: 40px;
  background: lightgray;
  border: 0;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  cursor: not-allowed;
}

.login__btn__active {
  background: #fe8b17;
  cursor: pointer;
}
</style>
