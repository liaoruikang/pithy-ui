import type { AppendRule, ValidateFn, ValidateResult } from '@pithy-ui/hooks';
import type { FormItemProps, FormProps } from '.';
import { Align, Size } from '@pithy-ui/utils';
import { Ref } from 'vue';

export type ValidateTrigger = 'change' | 'blur';

export interface FormItemContext {
  props: Ref<FormItemProps>;
  scrollIntoView: (arg?: boolean | ScrollIntoViewOptions | undefined) => void;
  validate: ValidateFn;
  clearValidate: () => void;
  resetField: () => void;
  updateInitialValue: () => void;
  appendInputId: (id: string) => void;
  clearInputId: (id: string) => void;
}

export type ScrollIntoViewArg = boolean | ScrollIntoViewOptions | undefined;

export interface FormContext {
  props: FormProps;
  appendRule: AppendRule;
  scrollIntoView: (field: string, arg?: ScrollIntoViewArg) => void;
  appendFormItemContext: (field: FormItemContext) => void;
}

export interface CommonPropsDefaults {
  size: Size | undefined;
  labelFocus: boolean;
  labelWidth: string;
  verticalLabel: boolean;
  inline: boolean;
  labelAlign: Align;
  validateTrigger: ValidateTrigger;
  validateAppear: boolean;
  required: boolean;
  requiredAsteriskLocation: 'left' | 'right';
  ruleChangeValidate: boolean;
  numberTransform: boolean;
}

export interface ValidateResultGroup {
  success: ValidateResult[];
  error: ValidateResult[];
}
