<script setup lang="ts">
import { EfInput } from '@effortless-design/components';
import { ref } from 'vue';
console.log(EfInput);
const value = ref<string>('');
</script>

<template>
  <ef-input v-model="value"></ef-input>
</template>

<style scoped></style>
