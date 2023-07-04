import type { ModelValue, ModifierFunction } from '@pithy-ui/hooks';
import { buildProps, emitsValidate, events } from '@pithy-ui/utils';
import type { Align, Size } from '@pithy-ui/utils';
import { ExtractPropTypes, PropType } from 'vue';

export const inputNumberProps = buildProps({
  modelValue: {
    type: [String, Number] as PropType<ModelValue>,
  },
  size: {
    type: [Number, Array] as PropType<Size>,
  },
  align: {
    type: String as PropType<Align>,
    default: 'left',
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
  disabled: {
    type: Boolean,
  },
  controlsPosition: {
    type: String as PropType<'left' | 'right'>,
  },
});

const validate = emitsValidate(['string', 'number']);

export const inputNumberEmits = {
  [events.VMODEL]: (val: string | number) => validate(val),
  [events.BLUR]: (val: string | number) => validate(val),
  [events.FOCUS]: (val: string | number) => validate(val),
  [events.INPUT]: (val: string | number) => validate(val),
  decrease: (val: string | number) => validate(val),
  increase: (val: string | number) => validate(val),
};

export type InputNumberProps = ExtractPropTypes<typeof inputNumberProps>;
