import type { ExtractPropTypes } from 'vue';
import {
  SizeProp,
  buildProps,
  definePropType,
  emitsValidate,
  events,
} from '@pithy-ui/utils/vue';
import type { SwitchValue } from './types';

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
    type: [Number, Array] as SizeProp,
  },
  tabindex: {
    type: [Number, String],
    default: 1,
  },
});

const validate = emitsValidate(['string', 'boolean', 'number']);

export const switchEmits = {
  [events.VMODEL]: (val: SwitchValue) => validate(val),
  [events.CHANGE]: (val: SwitchValue) => validate(val),
  [events.BEFORECHANGE]: (val: SwitchValue) => validate(val),
};

export type SwitchProps = ExtractPropTypes<typeof switchProps>;
