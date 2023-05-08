import { defineComponent, toRefs, computed } from 'vue';
import { iconProps } from '.';
import { createIconComponent } from '@swift/icons/src';

const iconComponent = createIconComponent();

export default defineComponent({
  name: 's-icon',
  props: iconProps,
  components: { iconComponent },
  setup(props, { slots }) {
    const { color, size } = toRefs(props);

    const styles = computed(() => {
      return {
        fontSize: size.value,
        color: color.value,
      };
    });

    return () => (
      <i class='s-icon' style={styles.value}>
        {props.customIcon ? (
          <iconComponent icon={props.customIcon} />
        ) : (
          slots.default?.()
        )}
      </i>
    );
  },
});
