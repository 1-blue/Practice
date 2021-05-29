<template>
  <section id="user__matadata">
    <slot name="username">
      <span>
        default username
      </span>
    </slot>
    <slot name="time">
      <span>
        default time
      </span>
    </slot>
    <slot name="karma">
      <span>
        default karma
      </span>
    </slot>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "UserProfile",
  computed: {
    ...mapState({
      item: state => state.hacker.item
    }),
  }
}
</script>

<style scoped>
#user__matadata{
  display: flex;
  flex-direction: column;
}
</style>