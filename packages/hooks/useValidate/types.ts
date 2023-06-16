import {
  InternalRuleItem,
  Rule,
  SyncValidateResult,
  ValidateOption,
  Values,
} from 'async-validator';
import { ComputedRef, Ref } from 'vue';

export interface ValidateResult {
  field: string;
  state: boolean;
  message?: string;
}

export type ValidateFn = (val?: any) => Promise<ValidateResult>;
export type ValidatorCallback = (
  validateFn: ValidateFn,
) => Promise<ValidateResult>;
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
