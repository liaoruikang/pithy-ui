import type { ExtractPropTypes } from 'vue';
import { definePropType, emitsVerify } from '@pithy-ui/utils/vue';

export type SwitchValue = boolean | string | number;

export const switchProps = {
  modelValue: {
    type: [Boolean, String, Number],
    default: undefined,
  },
  value: {
    type: [Boolean, String, Number],
    default: undefined,
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
  beforeChange: {
    type: definePropType<(val: SwitchValue) => Promise<boolean> | boolean>(
      Function,
    ),
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
  'update:model-value': emitsVerify<SwitchValue>([
    'string',
    'boolean',
    'number',
  ]),
  change: emitsVerify<SwitchValue>(['string', 'boolean', 'number']),
  beforChange: emitsVerify<SwitchValue>(['string', 'boolean', 'number']),
};

export type SwitchProps = ExtractPropTypes<typeof switchProps>;
