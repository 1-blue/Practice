<template>
  <div id="list__view">
    <ul class="container">
      <li
      v-for="data in list"
      :key="data.id"
      >
        <div class="point">{{ data.points || 0 }}</div>
        <div class="wapper">
          <a :href="data.url">{{ data.title }}</a>
          <div class="mata__data">
            <span>
              <i class="fas fa-clock"></i>
              {{ data.time_ago }}
            </span>
            <span v-if="data.user">
              <i class="fas fa-user"></i>
              <router-link :to="`/user/${data.user}`">{{ data.user }}</router-link>
            </span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "ListView",
  props: {
    fetchData: {
      type: String,
      require: true
    },
    state: {
      type: String,
      require: true
    }
  },
  computed: {
    ...mapState({
      list(state) {
        return state.hacker[this.state]
      }
    })
  },
  async created(){
    this.$store.dispatch(this.fetchData);
  }
}
</script>

<style scoped>
.container {
  padding: 1rem;
  display: flex;
  flex-direction: column;
}
.container > li {
  display: flex;
  border: 1px solid #3fe99c;
  padding: 10px 10px 10px 0;
}
.point{
  width: 50px;
  text-align: center;
  line-height: 34px;
  color: #00af60;
}
.mata__data {
  font-size: 0.5em;
}
.mata__data > span {
  margin-right: 10px;
}
</style>