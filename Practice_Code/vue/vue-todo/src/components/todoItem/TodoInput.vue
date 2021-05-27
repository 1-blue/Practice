<template>
  <section id="todo__input">
    <form class="input__item__form shadow">
      <input type="text" class="input" v-model="newTodoItem" @keydown.prevent.enter="onAddTodoItem" />
      <button type="button" class="btn" @click.prevent="onAddTodoItem">
        <i class="fas fa-plus"></i>
      </button>
    </form>

    <Modal v-show="isInput" @close="close">
      <h3 slot="header">Warning</h3>
      <span slot="body">할 일을 입력해주세요!</span>
    </Modal>
  </section>
</template>

<script>
import Modal from '../common/Modal.vue';
import { mapActions } from 'vuex';

export default {
  name: "TodoInput",
  components: {
    Modal
  },
  data(){
    return{
      newTodoItem: "",
      isInput: false
    }
  },
  methods: {
    ...mapActions(['SET_ADD_ITEM']),
    onAddTodoItem(){
      if(!this.checkInput){
        this.isInput = true;
        return;
      }
      this.SET_ADD_ITEM(this.newTodoItem);
      this.clearInput();
    },
    clearInput(){
      this.newTodoItem = "";
    },
    close(){
      this.isInput = false
    }
  },
  computed: {
    checkInput(){   // 입력했는지 체크
      return this.newTodoItem.length;
    }
  }
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