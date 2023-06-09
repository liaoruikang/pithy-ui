import type { AppendRule, ValidateFn } from '@pithy-ui/hooks';
import type { FormItemProps, FormProps } from '.';
import { Align, Size } from '@pithy-ui/utils';

export type ValidateTrigger = 'change' | 'blur';

export interface FormItemContext extends FormItemProps {
  validate: ValidateFn;
  clearValidate: () => void;
  resetField: (stop?: boolean) => void;
  updateInitialValue: () => void;
}

export interface FormContext {
  props: FormProps;
  appendRule: AppendRule;
  appendFormItemContext: (field: FormItemContext) => void;
}

export interface CommonPropsDefaults {
  size: Size;
  labelFocus: boolean;
  labelWidth: string;
  verticalLabel: boolean;
  inline: boolean;
  align: Align;
  validateTrigger: ValidateTrigger;
  validateAppear: boolean;
  required: boolean;
  requiredAsteriskLocation: 'left' | 'right';
}

const a = {
  c: 'a',
  b: '',
};

const b = {
  c: 'a',
};

for (const key in b) {
  const k = key as keyof typeof b;
  a[k] = b[k];
}
