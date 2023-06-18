import type { WritableComputedRef } from 'vue';
import type { PropDefaultValue } from '@pithy-ui/utils';

export type ModelValue = string | number;

export interface ModelProps {
  value: ModelValue | PropDefaultValue;
  modelValue: ModelValue | PropDefaultValue;
}

export type ModelEmit<T> = T &
  ((event: 'update:model-value', val: ModelValue) => void);

export type ModelPlugin = (val: ModelValue, oldValue: ModelValue) => ModelValue;

export type UseModel = <T, E>(
  props: T & ModelProps,
  emit: ModelEmit<E>,
  plugins?: ModelPlugin | ModelPlugin[],
) => WritableComputedRef<ModelValue>;
