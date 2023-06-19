import type { Ref, WritableComputedRef } from 'vue';

export type ModelValue = string | number;

export interface ModelProps {
  value?: ModelValue;
  modelValue?: ModelValue;
}

export type ModelEmit<T> = T &
  ((event: 'update:model-value', val: ModelValue) => void);

export type ModifierFunction = (
  val: ModelValue,
  inputType: ModelValue,
  stop: () => void,
) => ModelValue | void;

export type UseModel = <T, E>(
  props: T & ModelProps,
  emit: ModelEmit<E>,
  modifier?: () => ModifierFunction | ModifierFunction[],
) => {
  modelValue: WritableComputedRef<ModelValue>;
  modelInputType: Ref<ModelValue>;
};
