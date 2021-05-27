<template>
  <transition name="modal">
    <div class="modal__mask">
      <div class="modal__wrapper">
        <div class="modal__container">
          
          <!-- 헤더 -->
          <div class="modal__header">
            <slot name="header">
              default header
            </slot>
            <button class="modal__btn" @click="$emit('close')">
              <i class="fas fa-window-close close__icon"></i>
            </button>
          </div>

          <!-- 바디 -->
          <div class="modal__body">
            <slot name="body">
              default body
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {

}
</script>

<style>
.modal__mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal__wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal__container {
  width: 300px;
  margin: 0px auto;
  padding: 10px 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
  min-height: 160px;
}

.modal__header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.modal__header h3 {
  margin: 0;
  color: #42b983;
  font-size: 2rem;
  margin-top: 10px;
}

.modal__btn {
  background: transparent;
  color: #42b983;
  border: 0;
  cursor: pointer;
  padding: 0;
}

.close__icon {
  font-size: 2em;
}

.modal__body {
  margin: 20px 0;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal__container,
.modal-leave-active .modal__container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>