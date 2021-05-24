<template>
  <section id="todo__list">
    <ul class="item__container">
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
    </ul>
  </section>
</template>

<script>
export default {
  name: "TodoList",
  props: {
    todoItems: {
      type: Array,
    }
  },
  methods: {
    // 아이템체크관련
    onToggleCheckItem(item){
      this.$emit("onToggleCheckItem", item);
    },

    // 아이템삭제관련
    onRemoveItem(item){
      this.$emit("onRemoveItem", item)
    },
  },
}
</script>

<style scoped>

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