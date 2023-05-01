import type { ExtractPropTypes, PropType } from 'vue';

export type switchModelValue = boolean | string | number;

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
  activeText: {
    type: [Boolean, String, Number],
  },
  inactiveText: {
    type: [Boolean, String, Number],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  beforeLoading: {
    type: Boolean,
    default: true,
  },
  beforChange: Function as PropType<
    (value: switchModelValue) => Promise<any> | boolean
  >,
};

export const switchEmits = {
  'update:model-value': (val: boolean | string | number) =>
    ['string', 'boolean', 'number'].includes(typeof val),
};

export type switchProps = ExtractPropTypes<typeof switchProps>;
export type switchEmits = typeof switchEmits;
