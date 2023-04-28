<template>
  <div class="ef-input">
    <input type="text" class="ef-input__inner" v-model="modelValue" />
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { inputProps } from './input.ts';
export default defineComponent({
  name: 'ef-input',
  props: inputProps,
  setup(props, { emit }) {
    const modelValue = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        emit('update:modelValue', val);
      },
    });
    return {
      modelValue,
    };
  },
});
</script>
<style scoped></style>
