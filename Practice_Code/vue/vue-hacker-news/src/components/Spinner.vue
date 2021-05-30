<template>
  <div class="spinner" v-show="spinnerStatus">
    <div class="double-bounce1"></div>
    <div class="double-bounce2"></div>
  </div>
</template>

<script>
// 코드출처 https://tobiasahlin.com/spinkit/

export default {
  name: "Spinner",
  props: {
    spinnerStatus: {
      type: Boolean,
      required: true,
    }
  }
}
</script>

<style scoped>
.spinner {
  width: 80px;
  height: 80px;
  position: absolute;
  top: 30vh;
  left: 45vw;
}

.double-bounce1, .double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #42b883;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  
  -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
  animation: sk-bounce 2.0s infinite ease-in-out;
}

.double-bounce2 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}

@-webkit-keyframes sk-bounce {
  0%, 100% { -webkit-transform: scale(0.0) }
  50% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bounce {
  0%, 100% { 
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 50% { 
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}
</style>