import { SizeProp, buildProps } from '@pithy-ui/utils';
import type { Align } from '@pithy-ui/utils';
import { Rule, Rules } from 'async-validator';
import { ExtractPropTypes, PropType } from 'vue';
import { CommonPropsDefaults, ValidateTrigger } from './types';

export const commonPropsDefaults: CommonPropsDefaults = {
  size: 1,
  labelFocus: true,
  labelWidth: '80px',
  verticalLabel: false,
  inline: false,
  align: 'right',
  validateTrigger: 'change',
  validateAppear: true,
  required: false,
  requiredAsteriskLocation: 'left',
};

const commonFormProps = buildProps({
  size: {
    type: [String, Number, Array] as SizeProp,
  },
  labelFocus: {
    type: Boolean,
  },
  labelWidth: {
    type: String,
  },
  verticalLabel: {
    type: Boolean,
  },
  inline: {
    type: Boolean,
  },
  align: {
    type: String as PropType<Align>,
  },
  validateTrigger: {
    type: String as PropType<ValidateTrigger>,
  },
  validateAppear: {
    type: Boolean,
  },
  required: {
    type: Boolean,
  },
  requiredAsteriskLocation: {
    type: String as PropType<'left' | 'right'>,
  },
});

export const formProps = buildProps({
  ...commonFormProps,
  model: {
    type: Object,
    required: true,
  },
  rules: {
    type: Object as PropType<Rules>,
  },
});

export const formItemProps = buildProps({
  ...commonFormProps,
  label: {
    type: String,
    default: '',
  },
  field: {
    type: String,
    default: '',
  },
  rule: {
    type: Object as PropType<Rule>,
  },
});

export type FormProps = ExtractPropTypes<typeof formProps>;
export type FormItemProps = ExtractPropTypes<typeof formItemProps>;
