<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { PtForm, useTheme } from 'pithy-ui';
import type { ValidatorFuntion } from 'pithy-ui';
const { theme } = useTheme();
const test = ref(0);

const data = reactive({ theme, test, value: 0 });

const beforeChange = (): Promise<any> => {
  return new Promise(resolve => setTimeout(resolve, 500));
};

const form = ref<InstanceType<typeof PtForm>>();
onMounted(() => {
  form.value?.validate();
});

const reset = () => {
  form.value?.resetFields(undefined, true);
};
const update = () => form.value?.updateInitialValue();

const validator: ValidatorFuntion = (_, value, callback) => {
  if (value !== 'dark') {
    return callback('is not dark');
  }
  callback();
};
</script>

<template>
  <pt-form
    ref="form"
    :model="data"
    required
    required-asterisk-location="right"
    label-focus>
    <pt-form-item label="字段2" :label-focus="false" field="test">
      <pt-switch
        v-model="data.test"
        :active-value="1"
        :inactive-value="0"
        :before-change="beforeChange"
        inactive-text="关闭"
        active-text="开启">
      </pt-switch>
    </pt-form-item>
    <pt-form-item
      label-focus
      label="字段1"
      :rule="{
        validator,
      }"
      field="theme">
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
    <pt-form-item label-focus label="字段3" field="value">
      <input v-model="data.value" type="text" />
    </pt-form-item>
  </pt-form>

  <pt-icon color="red">
    <pt-sun></pt-sun>
  </pt-icon>

  <button @click="reset">重置</button>
  <button @click="update">更新</button>
</template>

<style lang="scss">
body {
  background-color: var(--pt-bg-color);
  transition: 0.3s;
}
</style>
