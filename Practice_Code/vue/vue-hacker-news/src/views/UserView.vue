<template>
  <section id="user__view">
    <user-profile>
      <span slot="username">
        <i class="fas fa-user"></i>
        {{ userInfo.id }}
      </span>
      <span slot="time">
        <i class="far fa-clock"></i>
        {{ userInfo.created }}
      </span>
      <span slot="karma">
        {{ userInfo.karma }}
      </span>
    </user-profile>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import UserProfile from '../components/UserProfile.vue';

export default {
  name: "UserView",
  components: {
    UserProfile
  },
  computed: {
    ...mapState({
      userInfo: state => state.hacker.userInfo
    }),
    name(){
      return this.$route.params.name;
    }
  },
  created(){
    this.$store.dispatch("hacker/FETCH_USER_INFO", this.name);
  }
}
</script>

<style scoped>

</style>