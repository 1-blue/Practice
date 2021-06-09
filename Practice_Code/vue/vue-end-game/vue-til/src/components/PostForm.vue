<template>
  <section id="post__form" class="shadow">
    <form @submit.prevent="submitForm" class="form">
      <ul class="form__list">
        <li>
          <label for="title">Title : </label>
          <input type="text" id="title" v-model.trim="title" class="shadow" />
        </li>
        <li>
          <label for="contents">Contents : </label>
          <textarea
            type="text"
            rows="5"
            id="contents"
            v-model.trim="contents"
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
import { fetchPost, createPosts, editPost } from "@/api/posts.js";

export default {
  name: "PostForm",
  data() {
    return {
      // 2
      title: "",
      contents: "",
      //

      warningText: "최대 200자까지 입력가능합니다.",
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
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
  async created() {
    if (!this.id) return;

    try {
      const { data } = await fetchPost(this.id);
      this.title = data.title;
      this.contents = data.contents;
    } catch (error) {
      switch (error.response.status) {
        case 401:
          alert("인증 토큰이 유효하지 않습니다.");
          break;
        case 500:
          alert("서버 측 에러입니다. 잠시후에 다시 시도해주세요");
          break;

        default:
          alert("알 수 없는 에러입니다.");
          break;
      }
    }
  },
  methods: {
    async submitForm() {
      try {
        if (this.id) {
          await editPost(this.id, {
            title: this.title,
            contents: this.contents,
          });
        } else {
          await createPosts({
            title: this.title,
            contents: this.contents,
          });
        }

        this.$router.push("/main");
      } catch (error) {
        switch (error.response.status) {
          case 400:
            alert("이미 게시글이 존재합니다.");
            break;
          case 404:
            alert("게시글을 찾을 수 없습니다.");
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
#post__form {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
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
