<script setup lang="ts">
const toggle = () => {
  document.documentElement.classList.toggle('drak');
};
</script>

<template>
  <button @click="toggle">切换主题</button>
  <ef-icon color="red">
    <ef-sun style="color: skyblue"></ef-sun>
  </ef-icon>
  <ef-icon color="blue">
    <ef-moon> </ef-moon>
  </ef-icon>
  <ef-switch></ef-switch>
</template>
