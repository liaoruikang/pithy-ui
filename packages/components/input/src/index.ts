import {
  buildProps,
  emitsValidate,
  events,
  propDefaultValue,
} from '@pithy-ui/utils';
import type { PropDefaultValue, Size } from '@pithy-ui/utils';
import { Component, ExtractPropTypes, PropType, VNode } from 'vue';
import { InputType } from './types';

export const inputProps = buildProps({
  modelValue: {
    type: [String, Number, Symbol] as PropType<
      string | number | PropDefaultValue
    >,
    default: propDefaultValue,
  },
  value: {
    type: [String, Number, Symbol] as PropType<
      string | number | PropDefaultValue
    >,
    default: propDefaultValue,
  },
  type: {
    type: String as PropType<InputType>,
    default: 'text',
  },
  size: {
    type: [Number, Array] as PropType<Size>,
  },
  max: {
    type: Number,
    default: undefined,
  },
  min: {
    type: Number,
    default: undefined,
  },
  step: {
    type: Number,
    default: 1,
  },
  strictStep: {
    type: Boolean,
    default: false,
  },
  formatter: {
    type: Function as PropType<(val: string | number) => string | number>,
  },
  placeholder: {
    type: String,
  },
  clearable: {
    type: Boolean,
  },
  showPassword: {
    type: Boolean,
  },
  disabled: {
    type: Boolean,
  },
  prefixIcon: {
    type: [String, Object] as PropType<string | SVGElement | VNode | Component>,
  },
  suffixIcon: {
    type: [String, Object] as PropType<string | SVGElement | VNode | Component>,
  },
});

const validate = emitsValidate(['string', 'number']);

export const inputEmits = {
  [events.VMODEL]: (val: string | number) => validate(val),
};

export type InputProps = ExtractPropTypes<typeof inputProps>;
