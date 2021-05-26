

<script>
import BaseComponent from './BaseComponent.vue';

export default {
  extends: BaseComponent,
  data(){
    return{
      x : 20
    }
  },
  methods:{
    show(){
      console.log(this.x);
    }
  }
}
</script>

<style>

</style>