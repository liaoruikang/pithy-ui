<template>
  <div
    :class="{
      [ns.b()]: true,
      [ns.is(`controls-${controlsPosition}`)]: controlsPosition,
    }">
    <pt-input
      v-bind="attrs"
      v-model="modelValue"
      :formatter="formatter"
      type="number"
      :max="max"
      :min="min"
      :size="size"
      :align="align"
      :disabled="disabled"
      :placeholder="placeholder"
      @keydown="onKeyDown"
      @keyup="clearSustain"
      @blur="onBlur">
      <template v-if="isUndefined(controlsPosition)" #prepend>
        <div :class="ns.e('decrease')" @mousedown="trigger('decrease')">
          <pt-icon><pt-minus /></pt-icon>
        </div>
      </template>
      <template v-else-if="!!slots.prepend" #prepend>
        <slot name="prepend" />
      </template>

      <template v-if="isUndefined(controlsPosition)" #append>
        <div :class="ns.e('increase')" @mousedown="trigger('increase')">
          <pt-icon><pt-add /></pt-icon>
        </div>
      </template>
      <template v-else-if="!!slots.append" #append>
        <slot name="append" />
      </template>

      <template v-if="controlsPosition === 'left'" #prefix>
        <div :class="ns.e('increase')" @mousedown="trigger('increase')">
          <pt-icon><pt-arrows-top /></pt-icon>
        </div>
        <div :class="ns.e('line')"></div>
        <div :class="ns.e('decrease')" @mousedown="trigger('decrease')">
          <pt-icon><pt-arrows-bottom /></pt-icon>
        </div>
      </template>
      <template v-else-if="!!slots.prefix" #prefix>
        <slot name="prefix" />
      </template>

      <template v-if="controlsPosition === 'right'" #subffix>
        <div
          :class="ns.e('increase')"
          @mouseup.stop
          @mousedown="trigger('increase')">
          <pt-icon><pt-arrows-top /></pt-icon>
        </div>
        <div :class="ns.e('line')"></div>
        <div :class="ns.e('decrease')" @mousedown="trigger('decrease')">
          <pt-icon><pt-arrows-bottom /></pt-icon>
        </div>
      </template>
      <template v-else-if="!!slots.subffix" #subffix>
        <slot name="subffix" />
      </template>
    </pt-input>
  </div>
</template>
<script setup lang="ts">
import {
  Bem,
  basespace,
  numberFilter,
  createPipe,
  isArray,
} from '@pithy-ui/utils';
import { computed, onUnmounted, useAttrs, useSlots } from 'vue';
import PtInput from '../../input';
import { inputNumberProps, inputNumberEmits } from '.';
import { useModel } from '@pithy-ui/hooks';
import type { ModifierFunction } from '@pithy-ui/hooks';
import type { ModelValue } from '@pithy-ui/hooks';
import { debounce, isUndefined, isNaN } from 'lodash-unified';
import { computeNumber } from './utils';
import type { ComputeType } from './types';
import { PtAdd, PtMinus, PtArrowsTop, PtArrowsBottom } from '@pithy-ui/icons';
import PtIcon from '../../icon';

defineOptions({
  name: `${basespace}-input-number`,
  inheritAttrs: false,
});

const ns = new Bem('input-number');

const attrs = useAttrs();
const slots = useSlots();

const props = defineProps(inputNumberProps);
const emit = defineEmits(inputNumberEmits);

const disposeDisabled: ModifierFunction = val => {
  if (props.disabled) return modelValue.value;
  return val;
};

const toPrecision = (val: ModelValue) => {
  if (isUndefined(props.precision)) return val;
  return Number(val).toFixed(props.precision);
};

const numberLimit = (val: ModelValue) => {
  const numVal = Number(val);
  if (numVal > props.max) val = props.max.toString();
  else if (numVal < props.min) val = props.min.toString();
  if (isNaN(val) || val === '') val = '0';
  return val;
};

const strictStepLimit = (val: ModelValue): ModelValue => {
  if (!props.strictStep) return val;
  return (Math.round(Number(val) / props.step) * props.step).toString();
};

const formatter = computed(() => {
  if (!props.formatter) return [];
  return isArray<ModifierFunction>(props.formatter)
    ? props.formatter
    : [props.formatter];
});

const initPipe = createPipe<ModelValue>(
  numberFilter,
  strictStepLimit,
  numberLimit,
  toPrecision,
);

const limitPipe = createPipe<ModelValue>(initPipe, ...formatter.value);

const modelValue = useModel(
  props,
  emit,
  () => disposeDisabled,
  () => initPipe,
);

/**
 * @description 计算数值
 */
const computePipe = createPipe<ModelValue, [ModelValue, ComputeType]>(
  numberFilter,
  computeNumber,
  strictStepLimit,
  numberLimit,
  toPrecision,
  ...formatter.value,
);

const onKeyDown = (e: KeyboardEvent) => {
  if (isTrigger) return e.preventDefault();
  switch (e.code) {
    case 'ArrowUp':
      trigger('increase');
      e.preventDefault();
      break;
    case 'ArrowDown':
      trigger('decrease');
      e.preventDefault();
      break;
  }
};

let sustainTimer: number;
let isTrigger = false;
const trigger = (type: ComputeType) => {
  isTrigger = true;
  const fn = type == 'decrease' ? decrease : increase;
  fn();
  sustain(fn);
};

const sustain = debounce((fn: () => void) => {
  if (!isTrigger) return;
  sustainTimer = setInterval(fn, 80);
}, 300);

const clearSustain = () => (clearInterval(sustainTimer), (isTrigger = false));

const increase = () => {
  const value = computePipe(
    modelValue.value,
    props.step.toString(),
    'increase',
  );
  modelValue.value = value;
  emit('increase', value);
};
const decrease = () => {
  const value = computePipe(
    modelValue.value,
    props.step.toString(),
    'decrease',
  );
  modelValue.value = value;
  emit('increase', value);
};

const onBlur = () => {
  modelValue.value = limitPipe(modelValue.value);
  if (isNaN(modelValue.value) || modelValue.value === '')
    modelValue.value = '0';
  clearSustain();
};

window.addEventListener('mouseup', clearSustain, true);

onUnmounted(() => {
  window.removeEventListener('mouseup', clearSustain);
});
</script>
