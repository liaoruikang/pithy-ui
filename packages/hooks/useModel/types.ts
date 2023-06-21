import type { WritableComputedRef } from 'vue';

export type ModelValue = string | number;

export interface ModelProps {
  value?: ModelValue;
  modelValue?: ModelValue;
}

export type ModelEmit<T> = T &
  ((event: 'update:model-value', val: ModelValue) => void);

export type ModifierFunction = (val: ModelValue) => ModelValue;

export type UseModel = <T, E>(
  props: T & ModelProps,
  emit: ModelEmit<E>,
  modifier?: () => ModifierFunction | ModifierFunction[],
  initModifier?: () => ModifierFunction | ModifierFunction[],
) => WritableComputedRef<ModelValue>;
