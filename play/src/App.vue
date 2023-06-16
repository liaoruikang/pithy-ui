<script setup lang="ts">
import { reactive, ref } from 'vue';
import { PtForm, useTheme, ValidateResult } from 'pithy-ui';
import type { ValidatorFuntion } from 'pithy-ui';
import { FormValidateResult } from 'packages/components/form/src/types';
const { theme } = useTheme();
const test = ref(NaN);

const data = reactive({ theme, test, value: 0 });

const beforeChange = (): Promise<any> => {
  return new Promise(resolve => setTimeout(resolve, 500));
};

const form = ref<InstanceType<typeof PtForm>>();

const validate = () => {
  form.value?.validate();
};
const reset = () => {
  form.value?.resetFields();
};
const update = () => form.value?.updateInitialValue();

const jump = () => form.value?.scrollIntoView('theme');

const validator: ValidatorFuntion = (_, value, callback) => {
  if (value !== 'dark') {
    return callback('is not dark');
  }
  callback();
};

const onValidate = (e: FormValidateResult | ValidateResult) => {
  console.log(e);
};
</script>

<template>
  <pt-form
    ref="form"
    style="width: 400px"
    :model="data"
    required-asterisk-location="left"
    label-width="80px"
    label-align="left"
    required
    :size="1"
    scroll-to-validate-error
    @validate="onValidate">
    <pt-form-item
      label="字段2"
      :rule="{
        type: 'number',
      }"
      validate-trigger="blur"
      field="test">
      <pt-switch
        v-model="data.test"
        :active-value="1"
        inactive-value="0"
        :before-change="beforeChange"
        inactive-text="关闭"
        active-text="开启">
      </pt-switch>
    </pt-form-item>
    <pt-form-item
      label-focus
      label="字段1"
      validate-trigger="change"
      :rule="{
        validator,
      }"
      field="theme"
      @validate="onValidate">
      <pt-switch
        v-model="data.theme"
        active-value="dark"
        inactive-value="light">
        <template #check-inactive>
          <pt-sun></pt-sun>
        </template>
        <template #check-active>
          <pt-moon></pt-moon>
        </template>
      </pt-switch>
    </pt-form-item>
    <pt-form-item
      :rule="{
        type: 'number',
      }"
      label-focus
      field="value"
      label="字段3">
      <input v-model="data.value" type="text" />
    </pt-form-item>
  </pt-form>

  <pt-icon color="red">
    <pt-sun></pt-sun>
  </pt-icon>

  <button @click="validate">校验</button>
  <button @click="reset">重置</button>
  <button @click="update">更新</button>
  <button @click="jump">跳转</button>
</template>

<style lang="scss">
body {
  background-color: var(--pt-bg-color);
  transition: 0.3s;
  height: 200vh;
}
</style>
