import { FormItemContext } from './types';

export const getFormItemContexts = (
  soucre: Map<string, FormItemContext>,
  fields?: string | string[],
): FormItemContext[] => {
  const result: FormItemContext[] = [];
  if (!fields) {
    for (const [_, formItemContext] of soucre) {
      result.push(formItemContext);
    }
  } else {
    if (typeof fields === 'string') fields = [fields];
    for (const field of fields) {
      if (soucre.has(field)) result.push(soucre.get(field) as FormItemContext);
    }
  }
  return result;
};
