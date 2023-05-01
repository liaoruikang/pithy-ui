import { defineComponent, toRefs, computed } from 'vue';
import { iconProps } from '.';

export default defineComponent({
  name: 'ef-icon',
  props: iconProps,
  setup(props, { slots }) {
    const { color, size } = toRefs(props);

    const styles = computed(() => {
      return {
        fontSize: size.value,
        color: color.value,
      };
    });
    return () => (
      <i class='ef-icon' style={styles.value}>
        {{ default: () => slots.default?.() }}
      </i>
    );
  },
});
