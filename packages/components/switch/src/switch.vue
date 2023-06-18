<template>
  <div
    :class="{
      [ns.b()]: true,
      [ns.is('disabled')]: disabled,
    }"
    :style="computedSizeStyles">
    <span
      v-if="inactiveText"
      :class="{
        [ns.e('inactive')]: true,
        [ns.is('active')]: !activeState,
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
    <button
      :class="{
        [ns.e('box')]: true,
        [ns.is('loading')]: loading,
      }"
      :tabindex="tabIndex"
      @blur="!disabled && blurValidate"
      @click.prevent="change">
      <span
        :class="{
          [ns.e('check')]: true,
          [ns.is('active')]: activeState,
          [ns.is('animation')]: checkAnimation,
        }">
        <span :class="ns.m('box')">
          <i v-show="loading" class="loading-icon" :class="ns.m('icon')">
            <span :class="ns.m('wrap')">
              <pt-loading2></pt-loading2>
            </span>
          </i>
          <i
            v-show="!loading"
            class="inactive-icon"
            :class="ns.m('icon')"
            :aria-checked="!activeState">
            <span :class="ns.m('wrap')">
              <slot name="check-inactive">
                <pt-error></pt-error>
              </slot>
            </span>
          </i>
          <i
            v-show="!loading"
            class="active-icon"
            :class="ns.m('icon')"
            :aria-checked="activeState">
            <span :class="ns.m('wrap')">
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
        [ns.e('active')]: true,
        [ns.is('active')]: activeState,
      }"
      >{{ activeText }}</span
    >
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { switchProps, switchEmits } from '.';
import { PtSuccess, PtError, PtLoading2 } from '@pithy-ui/icons';
import { isPromise, getInputId, basespace, Bem } from '@pithy-ui/utils';
import { useSize } from '@pithy-ui/hooks';
import { useFormItem } from '@pithy-ui/components/form';
import type { SwitchValue } from './types';

defineOptions({
  name: `${basespace}-switch`,
});

const id = getInputId();
const blurValidate = useFormItem(id);
const ns = new Bem('switch');

const props = defineProps(switchProps);
const emit = defineEmits(switchEmits);

const computedSizeStyles = useSize(props, 'size');

const tabIndex = computed(() => (props.disabled ? -1 : props.tabindex));

const switchValue = ref(props.value);
watchEffect(() => (switchValue.value = props.value));

const active = computed({
  get(): SwitchValue {
    return props.modelValue ?? switchValue.value ?? false;
  },
  set(value: SwitchValue) {
    if (props.modelValue !== undefined)
      return emit('update:model-value', value);
    switchValue.value = value;
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
