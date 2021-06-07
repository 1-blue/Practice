<template>
  <section id="signup__form" class="shadow">
    <form @submit.prevent="submitForm" class="signup__form">
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
      <div>
        <label for="nickname">nickname : </label>
        <input type="text" id="nickname" v-model="nickname" class="shadow" />
      </div>
      <button
        type="submit"
        :disabled="!isValid"
        class="signup__btn"
        :class="{ signup__btn__active: isValid }"
      >
        회원가입
      </button>
    </form>

    <p>{{ logMessage }}</p>
  </section>
</template>

<script>
import { registerUser } from "@/api/index.js";
import { validateEmail } from "@/utils/validate.js";

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
  computed: {
    isValid() {
      return validateEmail(this.username) && this.password && this.nickname;
    },
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
        console.log(error);
        switch (error.status) {
          case 409:
            this.logMessage =
              "중복된 아이디입니다. 아이디를 교체하고 다시시도해주세요";
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
      this.nickname = "";
    },
  },
};
</script>

<style scoped>
#signup__form {
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

.signup__form > div {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.signup__btn {
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

.signup__btn__active {
  background: #fe8b17;
  cursor: pointer;
}
</style>
