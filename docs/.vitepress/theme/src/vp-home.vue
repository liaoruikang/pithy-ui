<template>
  <div class="vp-home">
    <div class="vp-home__banner">
      <s-icon size="100vw" custom-icon="/banner.svg"></s-icon>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
@use './styles/mixins/mixins' as *;
@use './styles/function/function' as *;
@use './styles/vars/vars' as *;
@include b('home') {
  display: flex;
  flex-direction: column;
  align-items: center;
  @include b($this: &, $element: 'banner') {
    perspective: 2000px;
    .s-icon {
      transform-style: preserve-3d;
      transform: rotateY(-45deg) rotateX(20deg);
      max-width: $middle_size * 0.85;
      max-height: $middle_size * 0.85 * 0.6119402985074627;
      box-shadow: 5px 5px 3px 5px get_var(shadow-color2);
    }
  }
}
</style>
