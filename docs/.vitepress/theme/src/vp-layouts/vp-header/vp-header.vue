<template>
  <div class="ef-header__conatiner">
    <nav class="ef-header__nav">
      <img
        :src="theme.logo"
        class="logo"
        alt="effortless-design"
        @click="push" />
    </nav>
  </div>
</template>
<script setup lang="ts">
import { useData, useRouter } from 'vitepress';

const router = useRouter();

const { theme } = useData();

// 跳转到首页
const push = () => router.go('/');
console.log(theme.value);
</script>
