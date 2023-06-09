import { Prop, PropType } from 'vue';

export const events = {
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

export const emitsVerify = <T>(types: Array<string>): ((val: T) => boolean) => {
  return (val: T): boolean => {
    return types.includes(typeof val);
  };
};

let count = 0;
export const getSoleId = () => {
  count++;
  const id = Date.now() + count;
  return id;
};
