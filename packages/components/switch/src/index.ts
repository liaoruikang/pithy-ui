import type { ExtractPropTypes } from 'vue';
import {
  SizeProp,
  buildProps,
  definePropType,
  emitsVerify,
  events,
} from '@pithy-ui/utils/vue';

export type SwitchValue = boolean | string | number;

export const switchProps = buildProps({
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
  size: {
    type: [String, Number, Array] as SizeProp,
    default: 1,
  },
});

const verify = emitsVerify<SwitchValue>(['string', 'boolean', 'number']);

export const switchEmits = {
  [events.VMODEL]: verify,
  [events.CHANGE]: verify,
  [events.BEFORECHANGE]: verify,
};

export type SwitchProps = ExtractPropTypes<typeof switchProps>;
