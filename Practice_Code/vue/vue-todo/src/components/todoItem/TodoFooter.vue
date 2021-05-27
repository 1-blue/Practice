<template>
  <section id="todo__footer" class="shadow">
    <button type="button" class="clear__btn" @click="onAllDeleteItem">Clear All</button>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "TodoFooter",
  methods: {
    ...mapActions({
      onAllDeleteItem: 'SET_ALL_REMOVE_ITEM'
    }),
  }
}
</script>

<style scoped>
#todo__footer{
  width: 100px;
  height: 50px;
}

.clear__btn{
  width: 100%;
  height: 100%;
  background: white;
  font-size: 1rem;
  font-weight: bold;
  color: red;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
}
</style>