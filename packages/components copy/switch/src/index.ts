import type { ExtractPropTypes } from 'vue';
import { emitsVerify } from '../../../utils/vue';

export type switchValueType = boolean | string | number;

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
  checkAnimation: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
};

export const switchEmits = {
  'update:model-value': emitsVerify<switchValueType>([
    'string',
    'boolean',
    'number',
  ]),
  change: emitsVerify<switchValueType>(['string', 'boolean', 'number']),
  beforChange: emitsVerify<switchValueType>(['string', 'boolean', 'number']),
};

export type switchProps = ExtractPropTypes<typeof switchProps>;
export type beforeChangeType =
  | ((value: switchValueType) => Promise<any> | boolean)
  | null
  | undefined;
