<template>
  <div class="vp_container">
    <vp-header>
      <template #nav>
        <vp-navbar></vp-navbar>
      </template>
    </vp-header>
    <div class="vp-content">
      <vp-found v-if="page.isNotFound"></vp-found>
      <vp-home v-else-if="frontmatter.layout === 'home'"></vp-home>
      <Content v-else />
    </div>
  </div>
</template>
<script setup lang="ts">
import VpHeader from './vp-layouts/vp-header/vp-header.vue';
import VpNavbar from './components/vp-navbar/vp-navbar.vue';
import VpHome from './vp-home.vue';
import VpFound from './vp-found.vue';
import { useData } from 'vitepress';

const { page, frontmatter } = useData();
</script>
<style lang="scss" scoped>
@use './styles/vars/vars' as *;
.vp-content {
  max-width: $super_size;
  margin: 0 auto;
}
</style>
