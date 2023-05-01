import type { ExtractPropTypes } from 'vue';

export const switchProps = {
  modelValue: {
    type: [Boolean, String, Number],
    default: false,
  },
  activeValue: {
    type: [Boolean, String, Number],
    default: true,
  },
  inactiveValue: {
    type: [Boolean, String, Number],
    default: false,
  },
};

export const switchEmits = {
  'update:model-value': (val: boolean | string | number) =>
    ['string', 'boolean', 'number'].includes(typeof val),
};

export type switchProps = ExtractPropTypes<typeof switchProps>;
export type switchEmits = typeof switchEmits;
