<template>
  <section id="news__view">
    <ul class="news__container">
      <li
      v-for="data in newsList"
      :key="data.id"
      >
        <a :href="data.url">{{ data.title }}</a>
        <div class="mata__data">
          <span>
            <i class="fas fa-clock"></i>
            {{ data.time_ago }}
          </span>
          <span>
            <i class="fas fa-user"></i>
            {{ data.user }}
          </span>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "NewsView",
  computed: {
    ...mapState({
      newsList: state => state.hacker.newsList
    })
  },
  async created(){
    this.$store.dispatch("hacker/FETCH_NEWS");
  }
}
</script>

<style scoped>
.news__container {
  padding: 1rem;
  display: flex;
  flex-direction: column;
}
.news__container > li {
  border: 1px solid #42b883;
  padding: 10px;
}
.mata__data {
  font-size: 0.5em;
}
.mata__data > span {
  margin-right: 10px;
}
</style>