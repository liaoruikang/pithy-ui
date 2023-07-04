import { computed, nextTick, ref } from 'vue';
import type { ModelValue, ModifierFunction, UseModel } from './types';
import { isArray, isUndefined } from '@pithy-ui/utils';

export const useModel: UseModel = (props, emit, modifier, initModifier) => {
  let init = false;
  const inputValue = ref(props.value ?? '');
  const updateValue = (val: ModelValue) => {
    if (init) val = exec(val, modifier?.());
    if (val === modelValue.value) return;
    if (isUndefined(props.modelValue)) {
      inputValue.value = val;
      return;
    }
    emit('update:model-value', val);
  };

  const modelValue = computed({
    get(): ModelValue {
      return isUndefined(props.modelValue)
        ? inputValue.value
        : props.modelValue;
    },
    set: updateValue,
  });

  nextTick(() => {
    modelValue.value = exec(modelValue.value, initModifier?.());
    init = true;
  });

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
