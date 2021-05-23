<template>
  <section id="hello__world">
    <h1>Hello</h1>
    {{ fruit }}
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
  }
}
</script>

<style scoped>
#hello__world{
  background: blue;
}
</style>>