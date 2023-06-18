import { computed } from 'vue';
import type { ModelValue, UseModel } from './types';
import { isArray, propDefaultValue } from '@pithy-ui/utils';

export const useModel: UseModel = (props, emit, plugin = []) => {
  const updateValue = (val: ModelValue) => {
    if (isArray(plugin)) {
      val = plugin.reduce((prev, fn) => fn(prev, modelValue.value), val);
    } else {
      val = plugin?.(val, modelValue.value);
    }
    if (props.modelValue !== propDefaultValue) emit('update:model-value', val);
  };

  const modelValue = computed({
    get(): ModelValue {
      return props.modelValue !== propDefaultValue ? props.modelValue : '';
    },
    set: updateValue,
  });

  return modelValue;
};
