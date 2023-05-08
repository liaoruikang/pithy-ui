<script setup lang="ts">
import { ref } from 'vue';
const toggle = () => {
  document.documentElement.classList.toggle('drak');
};
const value = ref('0');

const beforeChange = (): Promise<any> => {
  return new Promise(resolve => setTimeout(resolve, 500));
};

const change = (val: any) => {
  console.log('触发更新', val);
};
</script>

<template>
  <button @click="toggle">切换主题</button>
  <v-icon color="red">
    <s-sun style="color: skyblue"></s-sun>
  </v-icon>
  <v-icon color="blue">
    <s-moon> </s-moon>
  </v-icon>
  <v-switch
    @beforeChange="beforeChange"
    @change="change"
    v-model="value"
    active-value="1"
    inactive-value="0">
  </v-switch>
  <ABC></ABC>
</template>

<style lang="scss">
body {
  background-color: var(--s-bg-color);
  transition: 0.3s;
}
</style>
