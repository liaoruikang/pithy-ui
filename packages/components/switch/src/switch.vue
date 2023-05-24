<template>
  <div
    :class="{
      [b('switch')]: true,
      [s('disabled')]: disabled,
    }">
    <span
      v-if="inactiveText"
      :class="{
        [b('switch', 'inactive')]: true,
        [s('active')]: !activeState,
      }"
      >{{ inactiveText }}</span
    >
    <button
      @click="change"
      :class="{
        [b('switch', 'box')]: true,
        [s('loading')]: loading,
      }">
      <span
        :class="{
          [b('switch', 'check')]: true,
          [s('active')]: activeState,
          [s('animation')]: checkAnimation,
        }">
        <span
          :class="{
            [b('switch', 'check', 'box')]: true,
          }">
          <i
            v-show="loading"
            class="loading-icon"
            :class="{
              [b('switch', 'check', 'icon')]: true,
            }">
            <span
              :class="{
                [b('switch', 'check', 'wrap')]: true,
              }">
              <pt-loading2></pt-loading2>
            </span>
          </i>
          <i
            v-show="!loading"
            class="inactive-icon"
            :class="{
              [b('switch', 'check', 'icon')]: true,
            }"
            :aria-checked="!activeState">
            <span
              :class="{
                [b('switch', 'check', 'wrap')]: true,
              }">
              <slot name="check-inactive">
                <pt-error></pt-error>
              </slot>
            </span>
          </i>
          <i
            v-show="!loading"
            class="active-icon"
            :class="{
              [b('switch', 'check', 'icon')]: true,
            }"
            :aria-checked="activeState">
            <span
              :class="{
                [b('switch', 'check', 'wrap')]: true,
              }">
              <slot name="check-active">
                <pt-success></pt-success>
              </slot>
            </span>
          </i>
        </span>
      </span>
    </button>
    <span
      v-if="activeText"
      :class="{
        [b('switch', 'active')]: true,
        [s('active')]: activeState,
      }"
      >{{ activeText }}</span
    >
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, getCurrentInstance } from 'vue';
import { switchProps, switchEmits, switchValueType, beforeChangeType } from '.';
import { PtSuccess, PtError, PtLoading2 } from '@pithy-ui/icons';
import { isPromise } from '@pithy-ui/utils';
import { b, s, basespace } from '@pithy-ui/utils/vue';

export default defineComponent({
  name: `${basespace}-switch`,
  props: switchProps,
  emits: switchEmits,
  components: { PtSuccess, PtError, PtLoading2 },
  setup(props, { emit }) {
    const instance = getCurrentInstance();

    const beforeChange: beforeChangeType =
      instance?.vnode.props?.onBeforeChange;

    const active = computed({
      get(): switchValueType {
        return props.modelValue;
      },
      set(value: switchValueType) {
        emit('update:model-value', value);
      },
    });

    const beforeLoading = ref<boolean>(false);

    const activeState = computed(() => active.value == props.activeValue);

    const updateValue = computed(() =>
      activeState.value ? props.inactiveValue : props.activeValue,
    );

    const loading = computed(
      () => (props.beforeLoading && beforeLoading.value) || props.loading,
    );

    const change = () => {
      if (props.disabled) return;
      updateLoadingState(true);
      if (beforeChange) {
        const returnedValue = beforeChange(updateValue.value);
        console.log(returnedValue);

        if (isPromise(returnedValue))
          return returnedValue
            .then(() => updateState())
            .finally(() => updateLoadingState(false));
        if (returnedValue) {
          updateState();
        }
        updateLoadingState(false);
      } else {
        updateState();
        updateLoadingState(false);
      }
    };

    const updateLoadingState = (value: boolean) => {
      beforeLoading.value = value;
    };

    const updateState = () => {
      active.value = updateValue.value;
      emit('change', active.value);
    };
    return { active, change, activeState, loading, s, b };
  },
});
</script>
