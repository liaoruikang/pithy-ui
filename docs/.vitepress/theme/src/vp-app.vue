<template>
  <div class="theme_container">
    <vp-header>
      <template #nav>
        <vp-navbar></vp-navbar>
      </template>
    </vp-header>
  </div>
</template>
<script setup lang="ts">
import VpHeader from './vp-layouts/vp-header/vp-header.vue';
import VpNavbar from './components/vp-navbar/vp-navbar.vue';
</script>
