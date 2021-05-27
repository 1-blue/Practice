<template>
  <section id="todo__list">
    <transition-group class="item__container" name="list" tag="ul">
      <li
      class="shadow item"
      v-for="(item, index) of todoItems"
      :key="index"
      >
        <div>
          <i class="fas fa-check check__btn" :class="{ active__ckeck__btn: item.isCheck }" @click="onToggleCheckItem(item)"></i>
          <span class="item__text" :class="{ active__text: item.isCheck }">{{ item.name }}</span>
        </div>
        <button type="button" class="delete__btn" @click="onRemoveItem(item)">
          <i class="fas fa-trash-alt"></i>
        </button>
      </li>
    </transition-group>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "TodoList",
  computed: {
    todoItems(){
      return this.$store.state.todoItems;
    }
  },
  methods: {
    ...mapActions({
      onToggleCheckItem: 'SET_TOGGLE_CHECK_ITEM',
      onRemoveItem: 'SET_REMOVE_ITEM'
    }),
  },
}
</script>

<style scoped>

.list-enter-active, .list-leave-active{
  transition: all 1s;
}
.list-enter, .list-leave-to{
  opacity: 0;
  transform: translateY(15px);
}
.list-enter-to, .list-leave{
  opacity: 1;
}

.item__container{
  padding: 0;
  display: flex;
  flex-direction: column;
}

.item{
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  width: 300px;
  height: 50px;
  padding: 0 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  font-weight: bold;
}

.check__btn{
  margin-right: 10px;
  color: gray;
  cursor: pointer;
}

.item__text{
  color: grey;
  text-decoration: line-through;
}

.delete__btn{
  border: 0;
  background: transparent;
  color: red;
}

.active__ckeck__btn{
  color: deepskyblue;
}

.active__text{
  color: black;
  text-decoration: none;
}

</style>