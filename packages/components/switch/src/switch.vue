<template>
  <div
    :class="{
      [b('switch')]: true,
      [is('disabled')]: disabled,
    }"
    :style="computedSize.styles">
    <span
      v-if="inactiveText"
      :class="{
        [b('switch', 'inactive')]: true,
        [is('active')]: !activeState,
      }"
      >{{ inactiveText }}</span
    >
    <input
      v-show="false"
      :id="id"
      :checked="activeState"
      type="checkbox"
      :aria-checked="activeState"
      @change="change" />
    <label
      :for="id"
      :class="{
        [b('switch', 'box')]: true,
        [is('loading')]: loading,
      }"
      tabindex="1"
      @keyup.enter="change">
      <span
        :class="{
          [b('switch', 'check')]: true,
          [is('active')]: activeState,
          [is('animation')]: checkAnimation,
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
    </label>
    <span
      v-if="activeText"
      :class="{
        [b('switch', 'active')]: true,
        [is('active')]: activeState,
      }"
      >{{ activeText }}</span
    >
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref, watchEffect } from 'vue';
import { switchProps, switchEmits, SwitchValue } from '.';
import { PtSuccess, PtError, PtLoading2 } from '@pithy-ui/icons';
import {
  isPromise,
  getSoleId,
  b,
  is,
  basespace,
  formIdKey,
} from '@pithy-ui/utils';
import { useSize } from '@pithy-ui/hooks';

defineOptions({
  name: `${basespace}-switch`,
});

const id = inject(formIdKey, undefined) ?? `pt-form-${getSoleId()}`;

const props = defineProps(switchProps);
const emit = defineEmits(switchEmits);

const computedSize = useSize(props, 'size');

const switchValue = ref(props.value);
watchEffect(() => {
  switchValue.value = props.value;
});

const active = computed({
  get(): SwitchValue {
    return props.modelValue ?? switchValue.value ?? false;
  },
  set(value: SwitchValue) {
    if (props.modelValue !== undefined) {
      emit('update:model-value', value);
    } else {
      switchValue.value = value;
    }
  },
});

const beforeLoading = ref<boolean>(false);

const activeState = computed(() => active.value === props.activeValue);

const updateValue = computed(() =>
  activeState.value ? props.inactiveValue : props.activeValue,
);

const loading = computed(
  () => (props.beforeLoading && beforeLoading.value) || props.loading,
);

const change = () => {
  if (props.disabled || loading.value) return;
  updateLoadingState(true);
  if (props.beforeChange) {
    const returnedValue = props.beforeChange(updateValue.value);

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
</script>
