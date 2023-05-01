<template>
  <div class="ef-switch">
    <span
      v-if="inactiveText"
      class="ef-switch__inactive"
      :class="{
        'is-active': !activeState,
      }"
      >{{ inactiveText }}</span
    >
    <button class="ef-switch__box" @click="change">
      <Transition name="check">
        <span
          class="ef-switch__check"
          :class="{
            'is-active': activeState,
          }">
          <span class="ef-switch__check--box">
            <i v-show="loading" class="ef-switch__check--icon loading-icon">
              <span class="ef-switch__check--wrap">
                <ef-loading2></ef-loading2>
              </span>
            </i>
            <i
              v-show="!loading"
              class="ef-switch__check--icon inactive-icon"
              :aria-checked="!activeState">
              <span class="ef-switch__check--wrap">
                <slot name="check-inactive">
                  <ef-error></ef-error>
                </slot>
              </span>
            </i>
            <i
              v-show="!loading"
              class="ef-switch__check--icon active-icon"
              :aria-checked="activeState">
              <span class="ef-switch__check--wrap">
                <slot name="check-active">
                  <ef-success></ef-success>
                </slot>
              </span>
            </i>
          </span>
        </span>
      </Transition>
    </button>
    <span
      v-if="activeText"
      class="ef-switch__active"
      :class="{
        'is-active': activeState,
      }"
      >{{ activeText }}</span
    >
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { switchProps, switchEmits, switchModelValue } from '.';
import { EfSuccess, EfError, EfLoading2 } from '@effortless-design/icons';
import { isPromise } from '@effortless-design/utils';

export default defineComponent({
  name: 'ef-switch',
  props: switchProps,
  emits: switchEmits,
  components: { EfSuccess, EfError, EfLoading2 },
  setup(props, { emit }) {
    const active = computed({
      get(): switchModelValue {
        return props.modelValue;
      },
      set(value: switchModelValue) {
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
      updateLoadingState(true);
      if (props.beforChange) {
        const returnedValue = props.beforChange(updateValue.value);

        if (isPromise(returnedValue)) {
          returnedValue.then(
            () => updateState(),
            () => updateLoadingState(false),
          );
        } else if (returnedValue) {
          updateState();
          updateLoadingState(true);
        }
      } else {
        updateState();
        updateLoadingState(true);
      }
    };

    const updateLoadingState = (value: boolean) => {
      beforeLoading.value = value;
    };

    const updateState = () => {
      active.value = updateValue.value;
    };
    return { active, change, activeState, loading };
  },
});
</script>
