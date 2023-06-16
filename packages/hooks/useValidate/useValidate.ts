import Schema from 'async-validator';
import type { Rule, Rules } from 'async-validator';
import { ComputedRef, Ref, isRef } from 'vue';
import { clone, isEmpty } from 'lodash-unified';
import { AppendRule, ValidateResult, ValidatorCallback } from './types';

export const useValidate = (): AppendRule => {
  const validator = new Schema({});
  const rules: Rules = {};
  const appendRule = (
    rule: Rule,
    name: string,
    data: Ref<any> | ComputedRef<any> | ProxyConstructor,
    callback?: ValidatorCallback,
  ) => {
    const validateResult: ValidateResult = {
      field: name,
      state: true,
    };
    if (isEmpty(rule) || isEmpty(name)) return async () => validateResult;
    rules[name] = rule;
    validator.define(rules);
    const fn = async (val?: any) => {
      const validateValue = val ?? (isRef(data) ? data.value : data);

      const result = clone(validateResult);

      return validator
        .validate(
          { [name]: validateValue },
          {
            firstFields: [name],
            suppressWarning: true,
          },
        )
        .then(
          () => result,
          ({ _, fields }) => {
            if (!fields[name]) return result;
            result.state = false;
            result.message = fields[name][0].message;
            return Promise.reject(result);
          },
        )
        .finally(() => validator.define(rules));
    };
    const validateFn = async (val?: any) => callback?.(fn) ?? fn(val);
    return validateFn;
  };
  return appendRule;
};
