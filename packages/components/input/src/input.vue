<template>
  <div :class="ns.b()" :style="computedSizeStyles">
    <div :class="ns.e('wrapper')">
      <input
        :id="id"
        ref="input"
        v-model="modelValue"
        :class="ns.e('inner')"
        :type="inputType"
        @blur="onBlur" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useFormItem } from '../../form';
import { inputProps, inputEmits } from '.';
import { basespace, Bem, getInputId } from '@pithy-ui/utils';
import { useSize, useModel } from '@pithy-ui/hooks';
import type { ModelPlugin } from '@pithy-ui/hooks';
import { ref, computed } from 'vue';

defineOptions({
  name: `${basespace}-input`,
});

const id = getInputId();

const ns = new Bem('input');

const props = defineProps(inputProps);
const emit = defineEmits(inputEmits);

const computedSizeStyles = useSize(props, 'size');

const blurValidate = useFormItem(id);

const inputType = computed(() =>
  props.type === 'number' ? 'text' : props.type,
);

const input = ref<HTMLInputElement | HTMLTextAreaElement>();

const disposeNumber: ModelPlugin = val => {
  if (props.type !== 'number') return val;
  val = val.toString().replace(/[^\d.]/g, '');
  val = val.replace(/(?<=\..*)\./g, '');

  const numVal = Number(val);
  const max = props.max ?? Infinity;
  const min = props.min ?? -Infinity;

  if (numVal > max) val = max;
  else if (numVal < min) val = min;

  return val;
};

const updateValue: ModelPlugin = val => (input.value!.value = val.toString());

const formatter: ModelPlugin = val => props.formatter?.(val) ?? val;

const modelValue = useModel(props, emit, [
  disposeNumber,
  formatter,
  updateValue,
]);

const onBlur = () => {
  if (props.type === 'number')
    modelValue.value = strictStepLimit(Number(modelValue.value)).toString();
  blurValidate();
};

const strictStepLimit = (val: number) => {
  if (!props.strictStep) return val;
  return Math.round(val / props.step) * props.step;
};
</script>
