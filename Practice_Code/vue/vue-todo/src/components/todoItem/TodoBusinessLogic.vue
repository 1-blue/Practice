<template>
  <section id="todo__business__logic">
    <todo-header></todo-header>
    <todo-input @onAddTodoItem="onAddTodoItem"></todo-input>
    <todo-list :todoItems="todoItems" @onToggleCheckItem="onToggleCheckItem" @onRemoveItem="onRemoveItem"></todo-list>
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
  data(){
    return{
      todoItems: [],
    }
  },
  created(){
    for(let i = 0; i < localStorage.length; i++){
      if(localStorage.key(i) === "loglevel:webpack-dev-server"){
        continue;
      }
      // localStorage에 string형식으로 object데이터가 들어가 있음
      // name, isCheck들어있어서 JSON.parse한것
      this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }
  },
  methods: {
    // 아이템추가
    onAddTodoItem(newItem){
      const tempItem = {};
      tempItem.name = newItem;
      tempItem.isCheck = true;

      this.addItemLocalStorage(tempItem);
      this.addTodoItems(tempItem);
    },
    addItemLocalStorage(tempItem){
      localStorage.setItem(tempItem.name, JSON.stringify(tempItem));
    },
    addTodoItems(tempItem){
      this.todoItems.push(tempItem);
    },

    // 아이템체크관련
    onToggleCheckItem(item){
      this.toggleCheckLocalStorage(item);
      this.toggleCheckItem(item);
    },
    toggleCheckLocalStorage(item){
      item.isCheck = !item.isCheck;
    },
    toggleCheckItem(item){
      localStorage.removeItem(item.name);
      localStorage.setItem(item.name, JSON.stringify(item));
    },

    // 아이템삭제관련
    onRemoveItem(item){
      this.removeLocalStorage(item);
      this.removeItem(item);
    },
    removeLocalStorage(item){
      localStorage.removeItem(item.name);
    },
    removeItem(item){
      const removeIndex = this.todoItems.indexOf(item);
      this.todoItems.splice(removeIndex, 1);
    },

    // 아이템전체삭제
    onAllDeleteItem(){
      this.allDeleteLocalStorage();
      this.allDeleteItem();
    },
    allDeleteLocalStorage(){
      localStorage.clear();
    },
    allDeleteItem(){
      this.todoItems = [];
    },
  }
}
</script>

<style>
#todo__business__logic{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>