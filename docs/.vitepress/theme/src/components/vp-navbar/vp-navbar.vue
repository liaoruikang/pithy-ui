<template>
  <div class="s-nav">
    <ul class="s-menu__normal">
      <li
        class="s-menu__item"
        :class="{
          active: currentPath == item.link,
        }"
        v-for="item in theme.nav"
        :key="item.link">
        <a :href="item.link">{{ item.text }}</a>
      </li>
      <s-switch v-model="drakTheme"></s-switch>
    </ul>
  </div>
</template>
<script lang="ts">
import { useData, useRoute } from 'vitepress';
import { computed, defineComponent } from 'vue';
import { useDrak } from '@swift/hooks';
export default defineComponent({
  name: 'vp-navbar',
  setup() {
    const { theme } = useData();
    const route = useRoute();
    const currentPath = computed(() => route.path.split('.')[0]);

    const drakTheme = useDrak(false);

    return { theme, currentPath, drakTheme };
  },
});
</script>
<style lang="scss" scoped>
@use '../../styles/mixins/reactive' as *;
@use '../../styles/mixins/mixins' as *;

.s-nav {
  @include center_flex('vertical');

  height: 100%;
  .s-menu__normal {
    display: flex;
    height: 100%;

    @include viewport_to_small {
      display: none;
    }

    .s-menu__item {
      display: flex;
      align-items: center;
      vertical-align: middle;
      padding: 0 15px;
      height: 100%;
      border-bottom: 2px solid transparent;
      box-sizing: border-box;
      @include transition(border-bottom);
      &.active {
        border-bottom: 2px solid #a29bfe;
      }
      a {
        color: #333;
      }
    }
    :deep(.s-switch) {
      padding: 0 15px;
      transform: scale(0.875);
    }
  }
}
</style>
