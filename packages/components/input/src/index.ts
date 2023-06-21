import { buildProps, emitsValidate, events } from '@pithy-ui/utils';
import type { Align, Size } from '@pithy-ui/utils';
import { Component, ExtractPropTypes, PropType, VNode } from 'vue';
import type { InputType } from './types';
import type { ModifierFunction } from '@pithy-ui/hooks';

export const inputProps = buildProps({
  modelValue: {
    type: String,
  },
  type: {
    type: String as PropType<InputType>,
    default: 'text',
  },
  size: {
    type: [Number, Array] as PropType<Size>,
  },
  align: {
    type: String as PropType<Align>,
    default: 'left',
  },
  maxLength: {
    type: Number,
    default: Infinity,
  },
  max: {
    type: Number,
    default: Infinity,
  },
  min: {
    type: Number,
    default: -Infinity,
  },
  step: {
    type: Number,
    default: 1,
  },
  strictStep: {
    type: Boolean,
    default: false,
  },
  precision: {
    type: Number,
    validator: (val: number) => val > 0 && val <= 100,
  },
  formatter: {
    type: [Function, Array] as PropType<ModifierFunction | ModifierFunction[]>,
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
