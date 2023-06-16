<template>
  <div
    ref="formItem"
    :class="{
      [ns.b()]: true,
      'vertical-label': mergeProps.verticalLabel,
      inline: mergeProps.inline,
    }"
    :style="compoutedSizeStyles">
    <div
      :class="{
        [ns.e('label')]: true,
      }"
      :style="{
        [ns.cssVar('form-label-width')]: mergeProps.labelWidth,
        textAlign: mergeProps.labelAlign,
      }">
      <label
        :class="{
          [ns.m('text')]: true,
          [ns.is(`required-${mergeProps.requiredAsteriskLocation}`)]:
            mergeProps.required,
        }"
        :for="inputId">
        {{ label }}
      </label>
    </div>
    <div
      :class="{
        [ns.e('content')]: true,
        [ns.is('error')]: !validateState,
      }">
      <slot></slot>
      <Transition :name="`${basespace}-zoom-top`" appear>
        <div
          v-if="!validateState"
          :class="{
            [ns.m('error')]: true,
          }">
          <slot name="error" :error="validateMessage">
            <span>{{ validateMessage }}</span>
          </slot>
        </div>
      </Transition>
    </div>
  </div>
</template>
<script setup lang="ts">
import { basespace, Bem, isDecimalNumber } from '@pithy-ui/utils';
import { formItemProps, commonPropsDefaults, formItemEmits } from '.';
import { formContextKey, formItemContextKey } from './constants';
import {
  computed,
  inject,
  ref,
  provide,
  watch,
  onMounted,
  reactive,
  toRef,
} from 'vue';
import type {
  FormContext,
  FormItemContext,
  CommonPropsDefaults,
  ScrollIntoViewArg,
} from './types';
import { cloneDeep, isArray } from 'lodash-unified';
import { useSize } from '@pithy-ui/hooks';
import type { ValidateResult } from '@pithy-ui/hooks';

defineOptions({
  name: `${basespace}-form-item`,
});

const ns = new Bem('form-item');

let initialValue: any;

const emit = defineEmits(formItemEmits);
const props = defineProps(formItemProps);

const {
  props: formContextProps,
  appendRule,
  appendFormItemContext,
} = inject(formContextKey) as FormContext;

const mergeProps = computed(() => {
  const formItemContextProps = cloneDeep({
    ...formContextProps,
    ...props,
  });

  for (const key in commonPropsDefaults) {
    const k = key as keyof CommonPropsDefaults;
    if (props[k] !== undefined) {
      (formItemContextProps[k] as any) = props[k];
    } else if (formContextProps[k] !== undefined) {
      (formItemContextProps[k] as any) = formContextProps[k];
    } else {
      (formItemContextProps[k] as any) = commonPropsDefaults[k];
    }
  }
  return formItemContextProps;
});

const compoutedSizeStyles = useSize(mergeProps, 'size');

const validateValue = computed({
  get: () => {
    return props.field ? formContextProps.model[props.field] : undefined;
  },
  set: (value: any) => {
    if (props.field in formContextProps.model)
      formContextProps.model[props.field] = value;
  },
});

const rules = toRef(formContextProps, 'rules');

const rule = computed(() => {
  let rule = props.rule ?? rules.value?.[props.field] ?? [];
  if (!isArray(rule)) rule = [rule];
  if (mergeProps.value.required)
    rule.push({
      required: true,
    });
  return rule;
});

const isNumberRule = computed(() =>
  rule.value.some(ruleItem => ruleItem.type === 'number'),
);

const validate = appendRule(
  rule.value,
  props.field,
  validateValue,
  async ValidateFn => {
    const validateResult = await ValidateFn(
      isNumberRule.value &&
        isDecimalNumber(validateValue.value) &&
        mergeProps.value.numberTransform
        ? Number(validateValue.value)
        : undefined,
    ).catch((errorResult: ValidateResult) => errorResult);
    validateMessage.value = validateResult.message ?? '';
    validateState.value = validateResult.state;

    emit('validate', validateResult);

    return validateResult;
  },
);

if (mergeProps.value.ruleChangeValidate && props.field)
  watch(rules, validate, { deep: true });

const clearValidate: FormItemContext['clearValidate'] = () => {
  validateState.value = true;
  validateMessage.value = '';
};

const resetField: FormItemContext['resetField'] = () =>
  (validateValue.value = initialValue);

const updateInitialValue: FormItemContext['updateInitialValue'] = () =>
  (initialValue = cloneDeep(validateValue.value));

const inputIds = reactive(new Set<string>());
const inputId = computed<string | undefined>(() =>
  mergeProps.value.labelFocus ? [...inputIds][0] ?? undefined : undefined,
);

const appendInputId: FormItemContext['appendInputId'] = id => inputIds.add(id);
const clearInputId: FormItemContext['clearInputId'] = id => inputIds.delete(id);

const validateState = ref(true);
const validateMessage = ref('');

if (mergeProps.value.validateAppear) validate();

if (mergeProps.value.validateTrigger === 'change')
  watch(validateValue, validate);

const formItem = ref<HTMLDivElement>();

const scrollIntoView: FormItemContext['scrollIntoView'] = arg => {
  const defaultArg: ScrollIntoViewArg = {
    behavior: 'smooth',
  };
  formItem.value?.scrollIntoView(arg ?? defaultArg);
};

const context: FormItemContext = {
  props: mergeProps,
  scrollIntoView,
  validate,
  clearValidate,
  resetField,
  updateInitialValue,
  appendInputId,
  clearInputId,
};

provide(formItemContextKey, context);

onMounted(() => {
  updateInitialValue();
  appendFormItemContext(context);
});

defineExpose({
  validate,
  clearValidate,
  resetField,
  updateInitialValue,
  scrollIntoView,
});
</script>
