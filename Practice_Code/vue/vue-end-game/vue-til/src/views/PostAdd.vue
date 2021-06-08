<template>
  <section id="post__add" class="shadow">
    <h1 class="title">Create Post</h1>
    <form @submit.prevent="submitForm" class="form">
      <ul class="form__list">
        <li>
          <label for="title">Title : </label>
          <input type="text" id="title" v-model="title" class="shadow" />
        </li>
        <li>
          <label for="contents">Contents : </label>
          <textarea
            type="text"
            rows="5"
            id="contents"
            v-model="contents"
            class="shadow"
            :class="{ warning__box: isContentsValidate }"
          />
        </li>
        <li>
          <button
            type="submit"
            :disabled="!isSubmitValidate"
            class="btn"
            :class="{ btn__active: isSubmitValidate }"
          >
            Create
          </button>
        </li>
        <li class="info__text">
          {{ infoText }}
        </li>
        <li class="warning__text" v-show="isContentsValidate">
          {{ warningText }}
        </li>
      </ul>
    </form>
  </section>
</template>

<script>
import { CreatePosts } from "@/api/index.js";

export default {
  name: "PostAdd",
  data() {
    return {
      title: "",
      contents: "",
      warningText: "최대 200자까지 입력가능합니다.",
    };
  },
  computed: {
    isSubmitValidate() {
      return this.title && this.contents && !this.isContentsValidate;
    },
    isContentsValidate() {
      return this.contents.length >= 200;
    },
    infoText() {
      return `${this.contents.length} / 200`;
    },
  },
  methods: {
    async submitForm() {
      try {
        await CreatePosts({
          title: this.title.trim(),
          contents: this.contents.trim(),
        });
      } catch (error) {
        switch (error.response.status) {
          case 400:
            alert("이미 게시글이 존재합니다.");
            break;
          case 500:
            alert("서버 측 에러입니다. 잠시 후 다시 시도해 주세요");
            break;

          default:
            alert("알 수 없는 에러입니다. 잠시 후 다시 시도해 주세요");
            break;
        }
      }
    },
  },
};
</script>

<style scoped>
#post__add {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  margin: auto;
  background: white;
}

.title {
  font-size: 2rem;
}

.info__text {
  position: absolute;
  top: 70%;
  left: 81%;
}
</style>
