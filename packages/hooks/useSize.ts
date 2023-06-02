import { ComputedRef, computed } from 'vue';
import { globalOptions } from '@pithy-ui/utils/vue';

export type Size = string | number | [string | number, string | number];
export interface SizeStyles {
  [key: string]: string | number;
}
export interface SizeReturn {
  styles: SizeStyles;
}
export const useSize = <T>(props: T, key: keyof T): ComputedRef<SizeReturn> => {
  const sizeReturn = computed<SizeReturn>(() => {
    let size = props[key] as Size;
    if (!size && size != 0) {
      size = [1, 1];
    } else if (!(size instanceof Array)) {
      size = [Math.max(Number(size), 0.1), Math.max(Number(size), 0.1)];
    }
    return {
      styles: {
        [`--${globalOptions.namespace}-width-size`]: size[0],
        [`--${globalOptions.namespace}-height-size`]: size[1],
      },
    };
  });
  return sizeReturn;
};
