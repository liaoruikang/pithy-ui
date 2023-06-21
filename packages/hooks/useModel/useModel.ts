import { computed, nextTick } from 'vue';
import type { ModelValue, ModifierFunction, UseModel } from './types';
import { isArray } from '@pithy-ui/utils';

export const useModel: UseModel = (props, emit, modifier, initModifier) => {
  const updateValue = (val: ModelValue) => {
    val = exec(val, modifier?.());
    if (props.modelValue === undefined || val === modelValue.value) return;
    emit('update:model-value', val);
  };

  const modelValue = computed({
    get(): ModelValue {
      return props.modelValue !== undefined ? props.modelValue : '';
    },
    set: updateValue,
  });

  nextTick(() => (modelValue.value = exec(modelValue.value, initModifier?.())));

  return modelValue;
};

const exec = (
  val: ModelValue,
  modifier: ModifierFunction | ModifierFunction[] | undefined,
): ModelValue => {
  if (modifier === undefined) return val;
  if (isArray(modifier)) {
    val = modifier.reduce((prev, fn) => fn?.(prev) ?? '', val);
  } else {
    val = modifier?.(val) ?? val;
  }
  return val;
};
