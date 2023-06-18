<template>
  <form :class="ns.b()">
    <slot />
  </form>
</template>
<script setup lang="ts">
import { Bem, basespace } from '@pithy-ui/utils';
import { provide } from 'vue';
import { formContextKey } from './constants';
import { formEmits, formProps } from '.';
import { useValidate } from '@pithy-ui/hooks';
import type {
  FormContext,
  FormItemContext,
  ValidateResultGroup,
} from './types';
import { getFormItemContexts } from './utils';

defineOptions({
  name: `${basespace}-form`,
});

const ns = new Bem('form');

const emit = defineEmits(formEmits);
const props = defineProps(formProps);

const appendRule = useValidate();

const formItemContextMap = new Map<string, FormItemContext>();

const clearValidate = (fields?: string | string[]): void => {
  const formItemContexts = getFormItemContexts(formItemContextMap, fields);
  formItemContexts.forEach(formItemContext => formItemContext.clearValidate());
};

const validate = async (
  fields?: string | string[],
): Promise<ValidateResultGroup> => {
  const formItemContexts = getFormItemContexts(formItemContextMap, fields);

  const validateResults = await Promise.all(
    formItemContexts.map(formItemContext => formItemContext.validate()),
  );

  const ValidateResultGroup: ValidateResultGroup = {
    success: validateResults.filter(result => result.state),
    error: validateResults.filter(result => !result.state),
  };

  if (props.scrollToValidateError && ValidateResultGroup.error.length) {
    const firstError = ValidateResultGroup.error[0];
    scrollIntoView(firstError.field, props.scrollToValidateErrorOptions);
  }

  emit('validate', ValidateResultGroup);

  return ValidateResultGroup;
};

const resetFields = (fields?: string | string[]) => {
  const formItemContexts = getFormItemContexts(formItemContextMap, fields);
  formItemContexts.forEach(formItemContext => formItemContext.resetField());
};

const updateInitialValue = (fields?: string | string[]) => {
  const formItemContexts = getFormItemContexts(formItemContextMap, fields);
  formItemContexts.forEach(formItemContext =>
    formItemContext.updateInitialValue(),
  );
};

const appendFormItemContext: FormContext['appendFormItemContext'] = field => {
  if (field.props.value.field)
    formItemContextMap.set(field.props.value.field, field);
};

const scrollIntoView: FormContext['scrollIntoView'] = (field, arg) => {
  const formItemContext = formItemContextMap.get(field);
  if (!formItemContext) return;
  formItemContext.scrollIntoView(arg);
};

provide(formContextKey, {
  props,
  appendRule,
  appendFormItemContext,
  scrollIntoView,
});

defineExpose({
  validate,
  clearValidate,
  resetFields,
  updateInitialValue,
  scrollIntoView,
});
</script>
