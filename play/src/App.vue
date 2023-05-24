<script setup lang="ts">
import { ref } from 'vue';
import { useTheme } from '@pithy-ui/hooks';

const { theme } = useTheme();

const value = ref('0');

const beforeChange = (): Promise<any> => {
  return new Promise(resolve => setTimeout(resolve, 500));
};
</script>

<template>
  <pt-switch v-model="theme" active-value="dark" inactive-value="light">
    <template #check-inactive>
      <pt-sun></pt-sun>
    </template>
    <template #check-active>
      <pt-moon></pt-moon>
    </template>
  </pt-switch>
  <pt-icon color="red">
    <!-- <pt-sun style="color: skyblue"></pt-sun> -->
  </pt-icon>
  <pt-switch
    @beforeChange="beforeChange"
    v-model="value"
    active-value="1"
    inactive-value="0">
  </pt-switch>
</template>

<style lang="scss">
body {
  background-color: var(--pt-bg-color);
  transition: 0.3s;
}
</style>
