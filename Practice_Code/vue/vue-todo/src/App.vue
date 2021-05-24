<template>
  <div id="app">
    <todo-business-logic></todo-business-logic>
  </div>
</template>

<script>
import TodoBusinessLogic from './components/todoItem/TodoBusinessLogic.vue';

export default {
  name: 'App',
  components: {
    TodoBusinessLogic
  },
}
</script>

<style>
*{
  box-sizing: border-box;
}
body{
  margin: 0;
  background: #F6F6F6;
}
input {
  border-style: groove;
  width: 200px;
  outline: none;
}
button{
  border-style: groove;
}
#app{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.shadow{
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.07);
}

</style>
