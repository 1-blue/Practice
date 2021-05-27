<template>
  <div id="app">
    {{ this.$store.dispatch("b/child/childAction")}}
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {

  },
  data(){
    return{
      fruit: "apple",
    }
  },
  created(){
    console.log(this.$store.dispatch("b/test"));
  }
}
</script>

<style>
#app{
  background: gray;
  width: 100%;
  height: 100%;
}


</style>
