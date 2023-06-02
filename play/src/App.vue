<script setup lang="ts">
import { ref } from 'vue';
import { useTheme } from '@pithy-ui/hooks';

const { theme } = useTheme();

const value = ref('0');

const switchRef = ref();

const beforeChange = (): Promise<any> => {
  return new Promise(resolve => setTimeout(resolve, 500));
};
</script>

<template>
  <pt-switch
    v-model="theme"
    :size="0"
    active-value="dark"
    inactive-value="light">
    <template #check-inactive>
      <pt-sun></pt-sun>
    </template>
    <template #check-active>
      <pt-moon></pt-moon>
    </template>
  </pt-switch>
  <pt-icon ref="switchRef" color="red">
    <pt-sun></pt-sun>
  </pt-icon>
  <pt-switch
    v-model="value"
    :size="1"
    active-value="1"
    inactive-value="0"
    :before-change="beforeChange"
    inactive-text="关闭"
    active-text="开启">
  </pt-switch>
</template>

<style lang="scss">
body {
  background-color: var(--pt-bg-color);
  transition: 0.3s;
}
</style>
