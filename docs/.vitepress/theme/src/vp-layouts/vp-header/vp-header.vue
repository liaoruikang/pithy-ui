<template>
  <div class="vp-header__conatiner">
    <nav class="vp-header__nav">
      <img :src="theme.logo" class="logo" alt="Swift UI" @click="push" />
      <div class="vp-header__navigate">
        <slot name="nav"></slot>
      </div>
    </nav>
  </div>
</template>
<script lang="ts">
import { useData, useRouter } from 'vitepress';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'vp-header',
  setup() {
    const router = useRouter();
    const { theme } = useData();
    const push = () => router.go('/');

    return {
      theme,
      push,
    };
  },
});

// 跳转到首页
</script>
