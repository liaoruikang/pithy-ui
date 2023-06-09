import Schema, {
  InternalRuleItem,
  Rule,
  Rules,
  SyncValidateResult,
  ValidateOption,
  Values,
} from 'async-validator';
import { ComputedRef, Ref, isRef } from 'vue';
import { isEmpty } from 'lodash-unified';

export type ValidateFn = () => Promise<boolean>;
export type ValidatorCallback = (validateFn: ValidateFn) => Promise<boolean>;
export type AppendRule = (
  rule: Rule,
  name: string,
  data: Ref<any> | ComputedRef<any> | ProxyConstructor,
  callback?: ValidatorCallback,
) => ValidateFn;

export type ValidatorFuntion =
  | ((
      rule: InternalRuleItem,
      value: any,
      callback: (error?: string | Error | undefined) => void,
      source: Values,
      options: ValidateOption,
    ) => void | SyncValidateResult)
  | undefined;

export const useValidate = (): AppendRule => {
  const validator = new Schema({});
  const rules: Rules = {};
  const appendRule = (
    rule: Rule,
    name: string,
    data: Ref<any> | ComputedRef<any> | ProxyConstructor,
    callback?: ValidatorCallback,
  ) => {
    if (isEmpty(rule) || isEmpty(name)) return async () => true;
    rules[name] = rule;
    validator.define(rules);
    const fn = async () => {
      const validateValue = isRef(data) ? data.value : data;
      return validator
        .validate(
          { [name]: validateValue },
          {
            firstFields: [name],
          },
        )
        .then(
          () => true,
          ({ _, fields }) => {
            if (!fields[name]) return true;
            return Promise.reject(fields[name][0].message || '');
          },
        )
        .finally(() => validator.define(rules));
    };
    const validateFn = async () => callback?.(fn) ?? fn();
    return validateFn;
  };
  return appendRule;
};
