

<script>
export default {
  props: {
    fruit: {
      type: String,
    }
  },
  render(createElement){
    return createElement(
      "section",
      [
        createElement('a', {
          attrs: {
            href: "#" + "aaaa"
          }
        }, this.$slots.default)
      ]
    );
  },
  data(){
    return{
      x: 10
    }
  },
  methods:{
    show(){
      console.log(this.$isServer);
    }
  },
  test: "test",
}
</script>

<style>

</style>