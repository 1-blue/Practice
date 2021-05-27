<template>
  <section id="todo__business__logic">
    <todo-header></todo-header>
    <todo-input></todo-input>
    <todo-list></todo-list>
    <todo-footer @onAllDeleteItem="onAllDeleteItem"></todo-footer>
  </section>
</template>

<script>
import TodoHeader from '../todoItem/TodoHeader.vue';
import TodoInput from '../todoItem/TodoInput.vue';
import TodoList from '../todoItem/TodoList.vue';
import TodoFooter from '../todoItem/TodoFooter.vue';

export default {
  name: "TodoBusinessLogic",
  components: {
    TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter
  },
}
</script>

<style>
#todo__business__logic{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>