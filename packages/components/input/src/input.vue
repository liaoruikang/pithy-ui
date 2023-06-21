<template>
  <div
    :class="{
      [ns.b()]: true,
      [ns.is('prepend')]: !!slots.prepend && type !== 'number',
      [ns.is('append')]: !!slots.append && type !== 'number',
      [ns.is('number')]: type === 'number',
    }"
    :style="computedSizeStyles">
    <div v-if="slots.prepend || type === 'number'" :class="ns.e('prepend')">
      <slot name="prepend">
        <div
          v-if="type === 'number'"
          :class="ns.m('number')"
          @mousedown="onMousedown('decrease')"
          @mouseup="onMouseup">
          <pt-icon><pt-minus /></pt-icon>
        </div>
      </slot>
    </div>
    <div :class="ns.e('wrapper')">
      <input
        :id="id"
        ref="input"
        v-bind="attrs"
        :value="modelValue"
        :class="ns.e('inner')"
        :type="inputType"
        :style="{
          textAlign: align,
        }"
        @blur="onBlur"
        @input="onInput" />
    </div>
    <div v-if="slots.append || type === 'number'" :class="ns.e('append')">
      <slot name="append">
        <div
          v-if="type === 'number'"
          :class="ns.m('number')"
          @mousedown="onMousedown('increase')"
          @mouseup="onMouseup">
          <pt-icon><pt-add /></pt-icon>
        </div>
      </slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useFormItem } from '../../form';
import { inputProps, inputEmits } from '.';
import {
  basespace,
  Bem,
  getInputId,
  isArray,
  createPipe,
} from '@pithy-ui/utils';
import { useSize, useModel } from '@pithy-ui/hooks';
import type { ModifierFunction, ModelValue } from '@pithy-ui/hooks';
import { ref, computed, useSlots, useAttrs } from 'vue';
import PtIcon from '../../icon';
import { PtAdd, PtMinus } from '@pithy-ui/icons';
import { debounce, isUndefined } from 'lodash-unified';
import { computeNumber } from './utils';
import type { ComputeType } from './types';

defineOptions({
  name: `${basespace}-input`,
  inheritAttrs: false,
});

const id = getInputId();

const ns = new Bem('input');

const slots = useSlots();
const attrs = useAttrs();

const props = defineProps(inputProps);
const emit = defineEmits(inputEmits);

const computedSizeStyles = useSize(props, 'size');

const blurValidate = useFormItem(id);

const inputType = computed(() =>
  props.type === 'number' ? 'text' : props.type,
);

const input = ref<HTMLInputElement | HTMLTextAreaElement>();

const formatter = computed(() => {
  if (!props.formatter) return [];
  return isArray<ModifierFunction>(props.formatter)
    ? props.formatter
    : [props.formatter];
});

const disposeNumber: ModifierFunction = val => {
  if (props.type !== 'number') return val;
  val = val.toString().replace(/[^\d.e-|+]/g, '');
  val = val.replace(/((?<=\..*)\.)|((?<=[^])[-+])/g, '');
  return val;
};

const disposeString: ModifierFunction = val => {
  if (props.type === 'number') return val;
  const strVal = val.toString();
  if (strVal.length > props.maxLength) return modelValue.value;
  return val;
};

const updateValue: ModifierFunction = val =>
  (input.value!.value = val.toString());

const toPrecision = (val: ModelValue) => {
  if (isUndefined(props.precision)) return val.toString();
  if (typeof val === 'string') return Number(val).toFixed(props.precision);
  return val.toFixed(props.precision);
};

const numberLimit = (val: ModelValue) => {
  const numVal = Number(val);
  if (numVal > props.max) val = props.max.toString();
  else if (numVal < props.min) val = props.min.toString();
  return val;
};

const strictStepLimit = (val: ModelValue): ModelValue => {
  if (!props.strictStep) return val;
  return (Math.round(Number(val) / props.step) * props.step).toString();
};

/**
 * @description number类型限制函数
 */
const limitPipe = createPipe<ModelValue>(
  strictStepLimit,
  numberLimit,
  toPrecision,
);

/**
 * @description 将非数值的字符串过滤
 */
const mainPipe = createPipe<ModelValue>(disposeNumber, limitPipe);

/**
 * @description 计算数值
 */
const computePipe = createPipe<ModelValue, [ModelValue, ComputeType]>(
  disposeNumber,
  computeNumber,
  limitPipe,
);

const modelValue = useModel(
  props,
  emit,
  () => [disposeNumber, disposeString, ...formatter.value, updateValue],
  () => val => props.type === 'number' ? mainPipe(val) : val,
);

const onBlur = () => {
  if (props.type === 'number') modelValue.value = mainPipe(modelValue.value);
  blurValidate();
};

const onInput = () => {
  modelValue.value = input.value?.value ?? modelValue.value;
};

let mouseTimer: number;
let isDown = false;
const onMousedown = (type: ComputeType) => {
  isDown = true;
  const fn = type == 'decrease' ? decrease : increase;
  fn();
  sustain(fn);
};

const sustain = debounce((fn: () => ModelValue) => {
  if (!isDown) return;
  mouseTimer = setInterval(fn, 100);
}, 300);

const onMouseup = () => (clearInterval(mouseTimer), (isDown = false));

const increase = () =>
  (modelValue.value = computePipe(modelValue.value, props.step, 'increase'));
const decrease = () =>
  (modelValue.value = computePipe(modelValue.value, props.step, 'decrease'));
</script>
