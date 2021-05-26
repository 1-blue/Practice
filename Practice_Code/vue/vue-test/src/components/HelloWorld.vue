<template>
  <section id="hello__world">
    <h1>Hello</h1>
    <input type="text" v-model="x.data"/>
    <input type="text" v-model="x.level"/>
  </section>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    fruit: {
      type: String,
      default: "fruit",
    }
  },
  data(){
    return{
      x: {
        data: "x",
        level: 1,
      }
    }
  },
  watch: {
    x: {
      handler: "testFunc",
      deep: true,
      immediate: true
    },
    "x.level": function(){
      console.log("! level");
    }
  },
  methods: {
    testFunc(val){
      console.log(val.data);
      // console.log(oldVal.data);
      console.log("최초실행인가여");
    }
  }
}
</script>

<style scoped>
#hello__world{
  background: blue;
}
</style>>