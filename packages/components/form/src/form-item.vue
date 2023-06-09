<template>
  <div
    :class="{
      [b('form-item')]: true,
      'vertical-label': MergeProps.verticalLabel,
      inline: inline,
    }"
    tabindex="1"
    @blur="blur">
    <div
      :class="{
        [b('form-item', 'label')]: true,
      }"
      :style="{
        width: MergeProps.labelWidth,
        textAlign: MergeProps.align,
      }">
      <label
        :class="{
          [b('form-item', 'label', 'text')]: true,
          [is(`required-${MergeProps.requiredAsteriskLocation}`)]:
            MergeProps.required,
        }"
        :for="MergeProps.labelFocus ? id : ''">
        {{ label }}{{ MergeProps.requiredAsteriskLocation }}
      </label>
    </div>
    <div
      :class="{
        [b('form-item', 'content')]: true,
      }">
      <slot></slot>
      <Transition appear>
        <div
          v-if="!validateState"
          :class="{
            [b('form-item', 'content', 'error')]: true,
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
import { b, basespace, getSoleId, formIdKey, is } from '@pithy-ui/utils';
import { formItemProps, commonPropsDefaults } from '.';
import { formContextKey } from './constants';
import {
  computed,
  inject,
  ref,
  provide,
  useSlots,
  watch,
  onMounted,
} from 'vue';
import type {
  FormContext,
  FormItemContext,
  CommonPropsDefaults,
} from './types';
import { cloneDeep, isArray } from 'lodash-unified';

defineOptions({
  name: `${basespace}-form-item`,
});

const id = `pt-form-${getSoleId()}`;
const defaultSlot = useSlots().default?.() || [];
if (defaultSlot.length === 1) {
  provide(formIdKey, id);
}

let initialValue: any;

const props = defineProps(formItemProps);

const {
  props: formContextProps,
  appendRule,
  appendFormItemContext,
} = inject(formContextKey) as FormContext;

const MergeProps = computed(() => {
  const formItemContextProps = cloneDeep({
    ...formContextProps,
    ...props,
  });

  for (const key in commonPropsDefaults) {
    const k = key as keyof CommonPropsDefaults;
    if (props[k] !== undefined) {
      (formItemContextProps[k] as any) = props[k];
      console.log(props[k], 'props', k);
    } else if (formContextProps[k] !== undefined) {
      (formItemContextProps[k] as any) = formContextProps[k];
      console.log(formContextProps[k], 'formContextProps', k);
    } else {
      (formItemContextProps[k] as any) = commonPropsDefaults[k];
    }
  }

  return formItemContextProps;
});

const validateValue = computed({
  get: () => {
    return props.field ? formContextProps.model[props.field] : undefined;
  },
  set: (value: any) => {
    if (props.field in formContextProps.model)
      formContextProps.model[props.field] = value;
  },
});

const rule = computed(() => {
  let rule = props.rule ?? formContextProps.rules?.[props.field] ?? [];
  if (!isArray(rule)) rule = [rule];
  if (MergeProps.value.required)
    rule.push({
      required: true,
    });
  return rule;
});

const validate = appendRule(
  rule.value,
  props.field,
  validateValue,
  async ValidateFn => {
    if (props.field) {
      return ValidateFn().then(
        validateResult => {
          validateMessage.value = '';
          return (validateState.value = validateResult);
        },
        (validateResult: string) => {
          validateState.value = false;
          return Promise.reject((validateMessage.value = validateResult));
        },
      );
    }
    return true;
  },
);

const clearValidate: FormItemContext['clearValidate'] = () => {
  validateState.value = true;
  validateMessage.value = '';
};

let stopValidate = false;

const resetField: FormItemContext['resetField'] = (stop = false) => {
  stopValidate = stop;
  validateValue.value = initialValue;
};

const updateInitialValue: FormItemContext['updateInitialValue'] = () =>
  (initialValue = cloneDeep(validateValue.value));

const context: FormItemContext = {
  ...props,
  validate,
  clearValidate,
  resetField,
  updateInitialValue,
};

const validateState = ref(true);
const validateMessage = ref('');

if (props.validateAppear) validate();

if (props.validateTrigger === 'change')
  watch(
    validateValue,
    () =>
      !stopValidate ? validate().catch(err => err) : (stopValidate = false),
    { deep: true },
  );

const blur = () => {
  if (props.validateTrigger === 'blur') validate();
};

onMounted(() => {
  updateInitialValue();
  appendFormItemContext(context);
});

defineExpose({
  validate,
  clearValidate,
  resetField,
  updateInitialValue,
});
</script>
