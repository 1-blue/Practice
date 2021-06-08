<template>
  <section id="signup__form" class="shadow">
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
          <label for="nickname">nickname : </label>
          <input type="text" id="nickname" v-model="nickname" class="shadow" />
        </li>
        <li>
          <button
            type="submit"
            :disabled="!isValidate"
            class="btn"
            :class="{ btn__active: isValidate }"
          >
            회원가입
          </button>
        </li>
      </ul>
    </form>
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
    };
  },
  computed: {
    isValidate() {
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
        this.warningText = `${data.username}님 회원가입에 성공하셨습니다.`;
      } catch (error) {
        switch (error.status) {
          case 409:
            alert("중복된 아이디입니다. 아이디를 수정하고 다시시도해주세요");
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
      this.nickname = "";
    },
  },
};
</script>

<style scoped>
#signup__form {
  background: white;
  width: 300px;
}
</style>
