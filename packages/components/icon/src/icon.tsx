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
        '--fill': color.value,
      };
    });
    // {{ default: () => slots.default() }}

    return () => (
      <i class='ef-icon' style={styles.value}>
        {{ default: () => slots.default?.() }}
      </i>
    );
  },
});
