<script setup lang="ts">
import { ref } from 'vue';
const toggle = () => {
  document.documentElement.classList.toggle('drak');
};
const value = ref('0');
</script>

<template>
  <button @click="toggle">切换主题</button>
  <ef-icon color="red">
    <ef-sun style="color: skyblue"></ef-sun>
  </ef-icon>
  <ef-icon color="blue">
    <ef-moon> </ef-moon>
  </ef-icon>
  <ef-switch v-model="value" active-value="1" inactive-value="0"> </ef-switch>
</template>

<style lang="scss">
body {
  background-color: var(--ef-bg-color);
  transition: 0.3s;
}
</style>
