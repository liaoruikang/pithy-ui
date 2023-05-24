import { defineComponent, toRefs, computed } from 'vue';
import { iconProps } from '.';
import { createIconComponent } from '@pithy-ui/icons';
import { b, basespace } from '@pithy-ui/utils/vue';

const iconComponent = createIconComponent();

export default defineComponent({
  name: `${basespace}-icon`,
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
      <i class={b('icon')} style={styles.value}>
        {props.customIcon ? (
          <iconComponent icon={props.customIcon} />
        ) : (
          slots.default?.()
        )}
      </i>
    );
  },
});
