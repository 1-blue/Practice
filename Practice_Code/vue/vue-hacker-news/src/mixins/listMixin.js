import ListView from '../components/ListView.vue';
import bus from '../utils/bus.js';

export default {
  components: {
    ListView
  },
  mounted(){
    bus.$emit("end:spinner");
  }
}