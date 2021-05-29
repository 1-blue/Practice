<template>
  <section id="item__view">
    <user-profile>
      <router-link :to="`/user/${item.user}`" slot="username">
        <i class="fas fa-user"></i>
        {{ item.user }}
      </router-link>
      <span slot="time">
        <i class="far fa-clock"></i>
        {{ item.time_ago }}
      </span>
    </user-profile>
    <h1>{{ item.title }}</h1>
    <p v-html="item.content"></p>
  </section>
</template>

<script>
import { mapState } from "vuex";
import UserProfile from '../components/UserProfile.vue';

export default {
  name: "ItemView",
  components: {
    UserProfile
  },
  computed: {
    ...mapState({
      item: state => state.hacker.item
    }),
    id(){
      return this.$route.query.id;
    }
  },
  created(){
    this.$store.dispatch("hacker/FETCH_ITEM", this.id)
  }
}
</script>

<style scoped>
#item__view{
  padding: 20px;
}
</style>