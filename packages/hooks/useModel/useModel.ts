import { computed, ref } from 'vue';
import type { ModelValue, UseModel } from './types';
import { isArray } from '@pithy-ui/utils';

export const useModel: UseModel = (props, emit, modifier) => {
  const modelInputType = ref('');
  const updateValue = (val: ModelValue) => {
    console.log(val);

    let isStop = false;
    const stop = () => {
      isStop = true;
    };
    const modifierFn = modifier?.();
    if (isArray(modifierFn)) {
      val = modifierFn.reduce(
        (prev, fn) =>
          isStop ? '' : fn?.(prev, modelInputType.value, stop) ?? '',
        val,
      );
    } else {
      val = modifierFn?.(val, modelInputType.value, stop) ?? val;
    }
    if (props.modelValue === undefined || isStop || val === modelValue.value)
      return;
    emit('update:model-value', val);
  };

  const modelValue = computed({
    get(): ModelValue {
      return props.modelValue !== undefined ? props.modelValue : '';
    },
    set: updateValue,
  });

  return {
    modelValue,
    modelInputType,
  };
};
