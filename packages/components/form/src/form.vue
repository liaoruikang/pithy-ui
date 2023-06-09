<template>
  <form
    :class="{
      [b('form')]: true,
    }">
    <slot />
  </form>
</template>
<script setup lang="ts">
import { b, basespace } from '@pithy-ui/utils';
import { provide } from 'vue';
import { formContextKey } from './constants';
import { formProps } from '.';
import { useValidate, ValidateFn } from '@pithy-ui/hooks';
import type { FormContext, FormItemContext } from './types';
import { getFormItemContexts } from './utils';

defineOptions({
  name: `${basespace}-form`,
});

const props = defineProps(formProps);
const appendRule = useValidate();

const formItemContextMap = new Map<string, FormItemContext>();

const clearValidate = (fields?: string | string[]): void => {
  const formItemContexts = getFormItemContexts(formItemContextMap, fields);
  formItemContexts.forEach(formItemContext => formItemContext.clearValidate());
};

const validate = async (fields?: string | string[]): Promise<boolean> => {
  const formItemContexts = getFormItemContexts(formItemContextMap, fields);
  const tasks: ValidateFn[] = formItemContexts.map(
    formItemContext => formItemContext.validate,
  );
  const tasksResult = await Promise.all(
    tasks.map(task => task().catch(err => err)),
  );
  const errorResult = tasksResult.filter(result => typeof result === 'string');
  if (errorResult.length) return Promise.reject(errorResult);
  return true;
};

const resetFields = (fields?: string | string[], stop = false) => {
  const formItemContexts = getFormItemContexts(formItemContextMap, fields);
  formItemContexts.forEach(formItemContext => formItemContext.resetField(stop));
};

const updateInitialValue = (fields?: string | string[]) => {
  const formItemContexts = getFormItemContexts(formItemContextMap, fields);
  formItemContexts.forEach(formItemContext =>
    formItemContext.updateInitialValue(),
  );
};

const appendFormItemContext: FormContext['appendFormItemContext'] = field => {
  if (field.field) formItemContextMap.set(field.field, field);
};

provide(formContextKey, {
  props,
  appendRule,
  appendFormItemContext,
});

defineExpose({
  validate,
  clearValidate,
  resetFields,
  updateInitialValue,
});
</script>
