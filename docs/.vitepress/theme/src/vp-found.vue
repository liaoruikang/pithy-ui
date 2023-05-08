<template>
  <div class="vp-found">
    <div class="vp-404">404</div>
    <div class="vp-found__text">ERROR... PAGE NOT FOUND</div>
    <p>哎呀！出错啦！您访问的页面似乎不在这个宇宙里了。</p>
    <div class="vp-found__back">
      <p>可能需要</p>
      <span @click="router.go('/')">返回首页</span>
      <span @click="back">返回上一页</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vitepress';

const router = useRouter();

const back = () => history.back();
</script>
<style lang="scss" scoped>
@use './styles/mixins/mixins' as *;
@use './styles/function/function' as *;
@include b('found') {
  @include center_flex {
    flex-direction: column;
  }
  height: calc(65vh - 50px);
  @include b('404') {
    font-size: 58px;
    line-height: 70px;
  }

  @include b($this: &, $element: 'text') {
    font-weight: bold;
    line-height: 50px;
  }

  p {
    line-height: 1.5;
    color: get_var(text-color);
  }

  @include b($this: &, $element: 'back') {
    margin-top: 20px;

    p {
      text-align: center;
      margin-bottom: 10px;
    }

    span {
      font-weight: bold;
      color: var(--s-text-color);
      cursor: pointer;
      @include transition(color, 0.2s);
      padding: 0 5px;
      &:hover {
        color: get_var(primary-color);
      }
    }
  }
}
</style>
