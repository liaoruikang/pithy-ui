import { buildProps, emitsValidate, events } from '@pithy-ui/utils';
import type { Align, Size } from '@pithy-ui/utils';
import { Component, ExtractPropTypes, PropType, VNode } from 'vue';
import type {
  Autocomplete,
  InputType,
  OptionalAutosize,
  Resize,
} from './types';
import type { ModelValue, ModifierFunction } from '@pithy-ui/hooks';

export const inputProps = buildProps({
  modelValue: {
    type: [String, Number] as PropType<ModelValue>,
  },
  value: {
    type: [String, Number] as PropType<ModelValue>,
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
  maxlength: {
    type: [Number, String],
  },
  minlength: {
    type: [Number, String],
  },
  max: {
    type: Number,
    default: Infinity,
  },
  min: {
    type: Number,
    default: -Infinity,
  },
  formatter: {
    type: [Function, Array] as PropType<ModifierFunction | ModifierFunction[]>,
  },
  readonly: {
    type: Boolean,
  },
  placeholder: {
    type: String,
  },
  autocomplete: {
    type: String as PropType<Autocomplete>,
  },
  autofocus: {
    type: Boolean,
  },
  tabindex: {
    type: [String, Number],
  },
  label: {
    type: String,
  },
  clearable: {
    type: Boolean,
  },
  showLimit: {
    type: Boolean,
  },
  showPassword: {
    type: Boolean,
  },
  disabled: {
    type: Boolean,
  },
  resize: {
    type: String as PropType<Resize>,
  },
  rows: {
    type: Number,
  },
  name: {
    type: String,
  },
  autosize: {
    type: [Boolean, Object] as PropType<OptionalAutosize | boolean>,
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
  [events.BLUR]: (val: string | number) => validate(val),
  [events.FOCUS]: (val: string | number) => validate(val),
  [events.INPUT]: (val: string | number) => validate(val),
  [events.CHANGE]: (val: string | number) => validate(val),
  [events.KEYDOWN]: (e: KeyboardEvent) => !!e,
  [events.KEYUP]: (e: KeyboardEvent) => !!e,
};

export type InputProps = ExtractPropTypes<typeof inputProps>;
