import { ValidateResult } from '@pithy-ui/hooks';
import { FormItemContext } from './types';

export const getFormItemContexts = (
  soucre: Map<string, FormItemContext>,
  fields?: string | string[],
): FormItemContext[] => {
  const result: FormItemContext[] = [];
  if (!fields) {
    for (const [key, formItemContext] of soucre) {
      if (key !== '') result.push(formItemContext);
    }
  } else {
    if (typeof fields === 'string') fields = [fields];
    for (const field of fields) {
      if (field !== '' && soucre.has(field))
        result.push(soucre.get(field) as FormItemContext);
    }
  }
  return result;
};

export const isValidateResult = (val: any): val is ValidateResult =>
  typeof val === 'object' && val !== null && 'field' in val && 'state' in val;
