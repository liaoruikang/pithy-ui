<template>
  <div
    v-if="type !== 'textarea'"
    :class="{
      [iNs.b()]: true,
      [iNs.is('prepend')]: !!slots.prepend,
      [iNs.is('append')]: !!slots.append,
      [iNs.is('disabled')]: disabled,
      [iNs.is('clearable')]: clearable,
    }"
    :style="computedSizeStyles">
    <div v-if="slots.prepend" :class="iNs.e('prepend')">
      <slot name="prepend" />
    </div>
    <div :class="iNs.e('wrapper')">
      <div v-if="slots.prefix || prefixIcon" :class="iNs.e('prefix')">
        <slot name="prefix">
          <pt-icon
            :custom-icon="!isIconComponent(prefixIcon) ? (prefixIcon as string | SVGElement | VNode) : undefined">
            <component
              :is="prefixIcon"
              v-if="isIconComponent(prefixIcon)"></component>
          </pt-icon>
        </slot>
      </div>
      <input
        :id="id"
        ref="input"
        :name="name"
        :value="modelValue"
        :class="iNs.e('inner')"
        :type="inputType"
        :style="{
          textAlign: align,
        }"
        :minlength="minlength"
        :maxlength="maxlength"
        :placeholder="placeholder"
        :readonly="disabled || readonly"
        :autocomplete="autocomplete"
        :autofocus="autofocus"
        :tabindex="tabindex"
        :aria-label="label"
        @keydown="emit('keydown', $event)"
        @keyup="emit('keyup', $event)"
        @blur="onBlur"
        @focus="emit('focus', modelValue)"
        @input="onInput"
        @change="emit('change', modelValue)" />
      <div
        v-if="slots.suffix || suffixIcon"
        :class="iNs.e('suffix')"
        @mousedown.prevent>
        <slot name="suffix">
          <pt-icon
            :custom-icon="!isIconComponent(suffixIcon) ? (suffixIcon as string | SVGElement | VNode) : undefined">
            <component
              :is="suffixIcon"
              v-if="isIconComponent(suffixIcon)"></component>
          </pt-icon>
        </slot>
      </div>
      <div
        v-if="type === 'password' && showPassword"
        :class="iNs.e('password')"
        @mousedown.prevent
        @click="isShowPassword = !isShowPassword">
        <pt-icon>
          <pt-eye v-if="isShowPassword" />
          <pt-close-eye v-else />
        </pt-icon>
      </div>
      <div
        v-if="clearable"
        :class="iNs.e('clear')"
        @mousedown.prevent
        @click="modelValue = ''">
        <pt-icon>
          <pt-clear />
        </pt-icon>
      </div>
      <div
        v-if="showLimit && maxlength"
        :class="iNs.e('limit')"
        @mousedown.prevent>
        <span>{{ modelValue.length }} / {{ maxlength }}</span>
      </div>
    </div>
    <div v-if="slots.append" :class="iNs.e('append')">
      <slot name="append" />
    </div>
  </div>
  <div v-else :class="iaNs.b('textarea')" :style="computedSizeStyles">
    <textarea
      :id="id"
      ref="textarea"
      :value="modelValue"
      :name="name"
      :class="iaNs.e('inner')"
      :minlength="minlength"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :readonly="disabled || readonly"
      :style="{ resize }"
      :rows="rows"
      :autocomplete="autocomplete"
      :autofocus="autofocus"
      :tabindex="tabindex"
      :aria-label="label"
      @keydown="emit('keydown', $event)"
      @keyup="emit('keyup', $event)"
      @blur="onBlur"
      @focus="emit('focus', modelValue)"
      @input="onInput"
      @change="emit('change', modelValue)"></textarea>
    <div
      v-if="showLimit && maxlength"
      :class="iaNs.e('limit')"
      @mousedown.prevent>
      <span>{{ modelValue.length }} / {{ maxlength }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useFormItem } from '../../form';
import { inputProps, inputEmits } from '.';
import {
  basespace,
  Bem,
  getInputId,
  isArray,
  createPipe,
  numberFilter,
  isString,
  isObject,
} from '@pithy-ui/utils';
import { useSize, useModel } from '@pithy-ui/hooks';
import { isBoolean, isElement, isNaN } from 'lodash-es';
import { ref, computed, useSlots, isVNode, watchEffect } from 'vue';
import { PtIcon } from '../../icon';
import { PtEye, PtCloseEye, PtClear } from '@pithy-ui/icons';
import type { ModifierFunction, ModelValue } from '@pithy-ui/hooks';
import type { VNode, Component } from 'vue';
import type { Autosize, InputType } from './types';
defineOptions({
  name: `${basespace}-input`,
});

const id = getInputId();

const iNs = new Bem('input');
const iaNs = new Bem('textarea');

const slots = useSlots();

const props = defineProps(inputProps);
const emit = defineEmits(inputEmits);

const computedSizeStyles = useSize(props, 'size');

const blurValidate = useFormItem(id);

const isShowPassword = ref(false);

const inputType = computed(() =>
  props.type === 'number' || isShowPassword.value ? 'text' : props.type,
);

const showLimit = computed(() => {
  const includeType: InputType[] = ['password', 'text', 'textarea'];
  return includeType.includes(props.type) && props.showLimit;
});

const isIconComponent = (icon: any): icon is Component => {
  return (
    !isString(icon) && !isElement(icon) && !isVNode(icon) && isObject(icon)
  );
};
const input = ref<HTMLInputElement>();
const textarea = ref<HTMLTextAreaElement>();

const verticalPadding = (padding: string[]) => {
  if (padding.length < 3) return Number(numberFilter(padding[0])) * 2;
  return (
    Number(numberFilter(padding[0])) +
    Number(numberFilter(padding[padding.length - 1]))
  );
};

const autoSize = () => {
  if (!textarea.value || !props.autosize) return;
  const autosize: Autosize = {
    minRows: -Infinity,
    maxRows: Infinity,
  };
  if (!isBoolean(props.autosize)) {
    autosize.minRows = props.autosize?.minRows ?? -Infinity;
    autosize.maxRows = props.autosize?.maxRows ?? Infinity;
  }
  textarea.value.style.height = 'auto';
  const scrollHeight = textarea.value.scrollHeight;
  const computedStyles = getComputedStyle(textarea.value);
  const padding = verticalPadding(computedStyles.padding.split(' '));
  const lineHeight = Number(numberFilter(computedStyles.lineHeight));
  const rawRows = (scrollHeight - padding) / lineHeight;
  if (rawRows < autosize.maxRows) {
    textarea.value.style.overflow = 'hidden';
  } else {
    textarea.value.style.overflow = '';
  }

  const rows = Math.max(autosize.minRows, Math.min(rawRows, autosize.maxRows));

  textarea.value.style.height = rows * lineHeight + padding + 'px';
};

const formatter = computed(() => {
  if (!props.formatter) return [];
  return isArray<ModifierFunction>(props.formatter)
    ? props.formatter
    : [props.formatter];
});

const disposeNumber: ModifierFunction = val =>
  props.type !== 'number' ? val : numberFilter(val);

const disposeDisabled: ModifierFunction = val => {
  if (props.disabled) return modelValue.value;
  return val;
};

const updateValue: ModifierFunction = val =>
  props.type === 'textarea'
    ? (textarea.value!.value = val)
    : (input.value!.value = val);

const numberLimit = (val: ModelValue) => {
  const numVal = Number(val);
  if (numVal > props.max) val = props.max.toString();
  else if (numVal < props.min) val = props.min.toString();
  if (isNaN(val) || val === '') val = '0';
  return val;
};

const limitPipe = createPipe<ModelValue>(disposeNumber, numberLimit);

const modelValue = useModel(
  props,
  emit,
  () => [disposeDisabled, disposeNumber, ...formatter.value, updateValue],
  () => [
    val => (props.type === 'number' ? limitPipe(val) : val),
    ...formatter.value,
  ],
);

const onBlur = () => {
  blurValidate();
  if (props.type === 'number')
    modelValue.value = modelValue.value.replace(/e(?![-+])/g, '');
  emit('blur', modelValue.value);
};

const onInput = () => {
  if (props.type === 'textarea') {
    autoSize();
    modelValue.value = textarea.value?.value ?? modelValue.value;
    emit('input', textarea.value?.value ?? modelValue.value);
    return;
  }
  modelValue.value = input.value?.value ?? modelValue.value;
  emit('input', input.value?.value ?? modelValue.value);
};

watchEffect(() => {
  if (!textarea.value) return;
  if (props.autosize) {
    textarea.value.style.overflow = 'hidden';
    autoSize();
  } else {
    textarea.value.style.overflow = '';
  }
});
</script>
