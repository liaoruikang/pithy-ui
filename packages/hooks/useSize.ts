import { ComputedRef, Ref, computed, isRef } from 'vue';
import { ns } from '@pithy-ui/utils';

export type Size = number | [number, number];
export interface SizeStyles {
  [key: string]: string | number;
}

export const useSize = <T, K extends keyof T>(
  props: T | Ref<T>,
  key: K,
): ComputedRef<SizeStyles> => {
  const sizeReturn = computed<SizeStyles>(() => {
    let size = isRef(props) ? (props.value[key] as Size) : (props[key] as Size);
    const styles: SizeStyles = {};
    if (!Array.isArray(size)) {
      size = [Math.max(Number(size), 0.1), Math.max(Number(size), 0.1)];
    }

    if (size.some(s => !isNaN(s))) {
      styles[ns.cssVar('width-size')] = size[0];
      styles[ns.cssVar('height-size')] = size[1];
    }
    return styles;
  });
  return sizeReturn;
};
