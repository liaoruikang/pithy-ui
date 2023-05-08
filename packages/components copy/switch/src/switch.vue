<template>
  <div
    class="s-switch"
    :class="{
      'is-disabled': disabled,
    }">
    <span
      v-if="inactiveText"
      class="s-switch__inactive"
      :class="{
        'is-active': !activeState,
      }"
      >{{ inactiveText }}</span
    >
    <button
      class="s-switch__box"
      @click="change"
      :class="{
        'is-loading': loading,
      }">
      <span
        class="s-switch__check"
        :class="{
          'is-active': activeState,
          'is-animation': checkAnimation,
        }">
        <span class="s-switch__check--box">
          <i v-show="loading" class="s-switch__check--icon loading-icon">
            <span class="s-switch__check--wrap">
              <s-loading2></s-loading2>
            </span>
          </i>
          <i
            v-show="!loading"
            class="s-switch__check--icon inactive-icon"
            :aria-checked="!activeState">
            <span class="s-switch__check--wrap">
              <slot name="check-inactive">
                <s-error></s-error>
              </slot>
            </span>
          </i>
          <i
            v-show="!loading"
            class="s-switch__check--icon active-icon"
            :aria-checked="activeState">
            <span class="s-switch__check--wrap">
              <slot name="check-active">
                <s-success></s-success>
              </slot>
            </span>
          </i>
        </span>
      </span>
    </button>
    <span
      v-if="activeText"
      class="s-switch__active"
      :class="{
        'is-active': activeState,
      }"
      >{{ activeText }}</span
    >
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, getCurrentInstance } from 'vue';
import { switchProps, switchEmits, switchValueType, beforeChangeType } from '.';
import { SSuccess, SError, SLoading2 } from '@swift/icons';
import { isPromise } from '@swift/utils';

export default defineComponent({
  name: 's-switch',
  props: switchProps,
  emits: switchEmits,
  components: { SSuccess, SError, SLoading2 },
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
    return { active, change, activeState, loading };
  },
});
</script>
