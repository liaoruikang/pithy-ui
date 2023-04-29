import { defineComponent, toRefs, computed } from 'vue';
import sun from './sun.svg';

export default defineComponent({
  name: 'ef-sun',
  setup(props) {
    return () => <svg></svg>;
  },
});
