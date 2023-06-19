<template>
  <div :class="ns.b()" :style="computedSizeStyles">
    <div :class="ns.e('wrapper')">
      <input
        :id="id"
        ref="input"
        :value="modelValue"
        :class="ns.e('inner')"
        :type="inputType"
        @input="onInput"
        @blur="onBlur" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useFormItem } from '../../form';
import { inputProps, inputEmits } from '.';
import { basespace, Bem, getInputId, isArray } from '@pithy-ui/utils';
import { useSize, useModel } from '@pithy-ui/hooks';
import type { ModifierFunction, ModelValue } from '@pithy-ui/hooks';
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

const disposeNumber: ModifierFunction = val => {
  if (props.type !== 'number') return val;
  val = val.toString().replace(/[^\d.]/g, '');
  val = val.replace(/(?<=\..*)\./g, '');
  return val;
};

const limit: ModifierFunction = val => {
  if (props.type === 'number') {
    const numVal = Number(val);
    if (numVal > props.max) val = props.max.toString();
    else if (numVal < props.min) val = props.max.toString();
    return val;
  } else {
    const strVal = val.toString();
    if (strVal.length > props.maxLength) return modelValue.value;
    return val;
  }
};

const updateValue: ModifierFunction = val =>
  (input.value!.value = val.toString());

const formatter = computed(() => {
  if (!props.formatter) return [];
  return isArray<ModifierFunction>(props.formatter)
    ? props.formatter
    : [props.formatter];
});

const { modelValue, modelInputType } = useModel(props, emit, () => [
  ...formatter.value,
  disposeNumber,
  limit,
  updateValue,
]);

const onBlur = () => {
  if (props.type === 'number') {
    modelValue.value = strictStepLimit(modelValue.value).toPrecision(
      props.precision,
    );
  }
  blurValidate();
};

const onInput = (e: Event) => {
  modelValue.value = input.value?.value ?? modelValue.value;
  modelInputType.value = (e as InputEvent).inputType;
};

const strictStepLimit = (val: ModelValue) => {
  if (!props.strictStep) return Number(val);
  return Math.round(Number(val) / props.step) * props.step;
};
</script>
