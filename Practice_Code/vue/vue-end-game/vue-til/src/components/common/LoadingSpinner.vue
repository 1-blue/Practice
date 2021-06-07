<template>
  <section id="loading__spinner">
    <ul class="sk__fading__circle">
      <li class="sk__circle1 sk__circle"></li>
      <li class="sk__circle2 sk__circle"></li>
      <li class="sk__circle3 sk__circle"></li>
      <li class="sk__circle4 sk__circle"></li>
      <li class="sk__circle5 sk__circle"></li>
      <li class="sk__circle6 sk__circle"></li>
      <li class="sk__circle7 sk__circle"></li>
      <li class="sk__circle8 sk__circle"></li>
      <li class="sk__circle9 sk__circle"></li>
      <li class="sk__circle10 sk__circle"></li>
      <li class="sk__circle11 sk__circle"></li>
      <li class="sk__circle12 sk__circle"></li>
    </ul>

    <a href="https://tobiasahlin.com/spinkit/">스피너 참고 사이트</a>
  </section>
</template>

<script>
export default {
  name: "LoadingSpinner",
};
</script>

<style>
.sk__fading__circle {
  margin: 100px auto;
  width: 40px;
  height: 40px;
  position: relative;
}

.sk__fading__circle .sk__circle {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

.sk__fading__circle .sk__circle:before {
  content: "";
  display: block;
  margin: 0 auto;
  width: 15%;
  height: 15%;
  background-color: #333;
  border-radius: 100%;
  -webkit-animation: sk__circleFadeDelay 1.2s infinite ease-in-out both;
  animation: sk__circleFadeDelay 1.2s infinite ease-in-out both;
}
.sk__fading__circle .sk__circle2 {
  -webkit-transform: rotate(30deg);
  -ms-transform: rotate(30deg);
  transform: rotate(30deg);
}
.sk__fading__circle .sk__circle3 {
  -webkit-transform: rotate(60deg);
  -ms-transform: rotate(60deg);
  transform: rotate(60deg);
}
.sk__fading__circle .sk__circle4 {
  -webkit-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  transform: rotate(90deg);
}
.sk__fading__circle .sk__circle5 {
  -webkit-transform: rotate(120deg);
  -ms-transform: rotate(120deg);
  transform: rotate(120deg);
}
.sk__fading__circle .sk__circle6 {
  -webkit-transform: rotate(150deg);
  -ms-transform: rotate(150deg);
  transform: rotate(150deg);
}
.sk__fading__circle .sk__circle7 {
  -webkit-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
}
.sk__fading__circle .sk__circle8 {
  -webkit-transform: rotate(210deg);
  -ms-transform: rotate(210deg);
  transform: rotate(210deg);
}
.sk__fading__circle .sk__circle9 {
  -webkit-transform: rotate(240deg);
  -ms-transform: rotate(240deg);
  transform: rotate(240deg);
}
.sk__fading__circle .sk__circle10 {
  -webkit-transform: rotate(270deg);
  -ms-transform: rotate(270deg);
  transform: rotate(270deg);
}
.sk__fading__circle .sk__circle11 {
  -webkit-transform: rotate(300deg);
  -ms-transform: rotate(300deg);
  transform: rotate(300deg);
}
.sk__fading__circle .sk__circle12 {
  -webkit-transform: rotate(330deg);
  -ms-transform: rotate(330deg);
  transform: rotate(330deg);
}
.sk__fading__circle .sk__circle2:before {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}
.sk__fading__circle .sk__circle3:before {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}
.sk__fading__circle .sk__circle4:before {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}
.sk__fading__circle .sk__circle5:before {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}
.sk__fading__circle .sk__circle6:before {
  -webkit-animation-delay: -0.7s;
  animation-delay: -0.7s;
}
.sk__fading__circle .sk__circle7:before {
  -webkit-animation-delay: -0.6s;
  animation-delay: -0.6s;
}
.sk__fading__circle .sk__circle8:before {
  -webkit-animation-delay: -0.5s;
  animation-delay: -0.5s;
}
.sk__fading__circle .sk__circle9:before {
  -webkit-animation-delay: -0.4s;
  animation-delay: -0.4s;
}
.sk__fading__circle .sk__circle10:before {
  -webkit-animation-delay: -0.3s;
  animation-delay: -0.3s;
}
.sk__fading__circle .sk__circle11:before {
  -webkit-animation-delay: -0.2s;
  animation-delay: -0.2s;
}
.sk__fading__circle .sk__circle12:before {
  -webkit-animation-delay: -0.1s;
  animation-delay: -0.1s;
}

@-webkit-keyframes sk__circleFadeDelay {
  0%,
  39%,
  100% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
}

@keyframes sk__circleFadeDelay {
  0%,
  39%,
  100% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
}
</style>
