<template>
  <section id="todo__input">
    <form class="input__item__form shadow">
      <input type="text" class="input" v-model="newTodoItem" @keydown.prevent.enter="onAddTodoItem" />
      <button type="button" class="btn" @click.prevent="onAddTodoItem">
        <i class="fas fa-plus"></i>
      </button>
    </form>
  </section>
</template>

<script>
export default {
  name: "TodoInput",
  data(){
    return{
      newTodoItem: "",
    }
  },
  methods: {
    onAddTodoItem(){
      this.$emit("onAddTodoItem", this.newTodoItem);
      this.clearInput();
    },
    clearInput(){
      this.newTodoItem = "";
    },
  },
}
</script>

<style scoped>
#todo__input{
  --object-height: 40px;
  --input-width: 200px;
  --btn-width: 40px;
}
.input__item__form{
  display: flex;
  border-radius: 10px
}
.input{
  border: 0;
  padding: 0 20px;
  width: var(--input-width);
  height: var(--object-height);
  font-size: 1rem;
}
.btn{
  border: 0;
  width: var(--btn-width);
  height: var(--object-height);
  background: linear-gradient(to right, #FD38EC, #BB32E3, #9F43FA);
  border-radius: 0 10px 10px 0;
  cursor: pointer;
  color: white;
}
</style>