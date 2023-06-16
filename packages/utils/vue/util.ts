import { Prop, PropType } from 'vue';
import { isArray, isObject } from '../typeGuard';

export interface Events {
  VMODEL: 'update:model-value';
  CHANGE: 'change';
  BEFORECHANGE: 'beforChange';
}

export const events: Events = {
  VMODEL: 'update:model-value',
  CHANGE: 'change',
  BEFORECHANGE: 'beforChange',
};

export const definePropType = <T>(val: any): PropType<T> => val;

export const buildProps = <Props extends Record<string, Prop<any>>>(
  props: Props,
): {
  readonly [K in keyof Props]: {
    [C in keyof Props[K]]: Props[K][C];
  };
} => props;

export const emitsValidate =
  (types: Array<string>) =>
  <T>(val: T): boolean =>
    types.includes(typeof val);

export const createInputId = (): (() => string) => {
  const idCache = new Set();
  return () => {
    let id;
    do {
      id = (Date.now() + Math.ceil(Math.random() * 1000000))
        .toString(8)
        .slice(-6);
    } while (idCache.has(id));
    idCache.add(id);
    return id;
  };
};

export const getInputId = createInputId();

export const deepEqual = (val1: any, val2: any): boolean => {
  if (val1 === val2) return true;
  if (isArray(val1) && isArray(val2)) {
    if (val1.length !== val2.length) return false;
    return val1.some((v, i) => deepEqual(v, val2[i]));
  } else if (isObject(val1) && isObject(val2)) {
    if (Object.keys(val1).length !== Object.keys(val2).length) return false;
    for (const key in val1) {
      if (!deepEqual(val1[key], val2[key])) return false;
    }
    return true;
  }
  return false;
};
