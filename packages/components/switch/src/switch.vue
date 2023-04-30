<template>
  <div class="ef-switch">
    <span class="ef-switch__inactive">关闭</span>
    <button class="ef-switch__box" @click="active = !active">
      <span
        class="ef-switch__check"
        :class="{
          'is-active': active,
        }"></span>
    </button>
    <span class="ef-switch__active">开启</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ef-switch',
  setup() {
    const active = ref(false);
    return { active };
  },
});
</script>
