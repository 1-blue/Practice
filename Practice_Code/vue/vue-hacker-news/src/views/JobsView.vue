<template>
  <section id="jobs__view">
    <ul class="jobs__container">
      <li
      v-for="data in jobList"
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
  name: "JobsView",
  computed: {
    ...mapState({
      jobList: state => state.hacker.jobList
    })
  },
  async created(){
    this.$store.dispatch("hacker/FETCH_JOBS");
  }
}
</script>

<style scoped>
.jobs__container {
  padding: 1rem;
  display: flex;
  flex-direction: column;
}
.jobs__container > li {
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