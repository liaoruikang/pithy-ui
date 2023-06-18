import { SizeProp, buildProps } from '@pithy-ui/utils';
import type { Align } from '@pithy-ui/utils';
import { Rule, Rules } from 'async-validator';
import { ExtractPropTypes, PropType } from 'vue';
import type {
  CommonPropsDefaults,
  ValidateTrigger,
  ScrollIntoViewArg,
  ValidateResultGroup,
} from './types';
import { isValidateResult } from './utils';
import type { ValidateResult } from '@pithy-ui/hooks';

export const commonPropsDefaults: CommonPropsDefaults = {
  size: undefined,
  labelFocus: true,
  labelWidth: '80px',
  verticalLabel: false,
  inline: false,
  labelAlign: 'right',
  validateTrigger: 'change',
  validateAppear: false,
  required: false,
  requiredAsteriskLocation: 'left',
  ruleChangeValidate: false,
  numberTransform: true,
};

const commonFormProps = buildProps({
  size: {
    type: [Number, Array] as SizeProp,
  },
  labelFocus: {
    type: Boolean,
    default: undefined,
  },
  labelWidth: {
    type: String,
  },
  verticalLabel: {
    type: Boolean,
    default: undefined,
  },
  inline: {
    type: Boolean,
    default: undefined,
  },
  labelAlign: {
    type: String as PropType<Align>,
  },
  validateTrigger: {
    type: String as PropType<ValidateTrigger>,
  },
  validateAppear: {
    type: Boolean,
    default: undefined,
  },
  required: {
    type: Boolean,
    default: undefined,
  },
  requiredAsteriskLocation: {
    type: String as PropType<'left' | 'right'>,
  },
  ruleChangeValidate: {
    type: Boolean,
    default: undefined,
  },
  numberTransform: {
    type: Boolean,
    default: undefined,
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
  scrollToValidateError: {
    type: Boolean,
    default: false,
  },
  scrollToValidateErrorOptions: {
    type: [Boolean, Object] as PropType<ScrollIntoViewArg>,
    default: undefined,
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

export const formItemEmits = {
  validate: (val: ValidateResult) => isValidateResult(val),
};

export const formEmits = {
  validate: (val: ValidateResultGroup) =>
    (val.error.some(item => isValidateResult(item)) || !val.error.length) &&
    (val.success.some(item => isValidateResult(item)) || !val.success.length),
};

export type FormProps = ExtractPropTypes<typeof formProps>;
export type FormItemProps = ExtractPropTypes<typeof formItemProps>;
