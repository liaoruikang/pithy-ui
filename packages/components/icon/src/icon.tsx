import { defineComponent, toRefs, computed } from 'vue';
import { iconProps } from '.';

export default defineComponent({
  name: 'ef-icon',
  props: iconProps,
  setup(props) {
    const { color, size, iconComponent } = toRefs(props);

    const styles = computed(() => {
      return {
        fontSize: size.value,
      };
    });

    return () => (
      <i class='ef-icon' style={styles.value}>
        <component
          is={iconComponent.value}
          color={color.value}
          size={size.value}></component>
      </i>
    );
  },
});
