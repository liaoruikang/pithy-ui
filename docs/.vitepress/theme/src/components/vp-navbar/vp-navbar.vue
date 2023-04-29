<template>
  <div class="ef-nav">
    <ul class="ef-menu">
      <li
        class="ef-menu__item"
        :class="{
          active: currentPath == item.link,
        }"
        v-for="item in theme.nav"
        :key="item.link">
        <a :href="item.link">{{ item.text }}</a>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { useData, useRoute } from 'vitepress';
import { computed, defineComponent } from 'vue';
export default defineComponent({
  name: 'vp-navbar',
  setup() {
    const { theme } = useData();
    const route = useRoute();
    const currentPath = computed(() => route.path.split('.')[0]);

    return { theme, currentPath };
  },
});
</script>
<style lang="scss" scoped>
.ef-nav {
  height: 100%;
  .ef-menu {
    display: flex;
    height: 100%;
    &__item {
      display: flex;
      align-items: center;
      vertical-align: middle;
      padding: 0 10px;
      height: 100%;
      border-bottom: 1px solid transparent;
      box-sizing: border-box;
      transition: border-bottom 0.3s;
      &.active {
        border-bottom: 2px solid #a29bfe;
      }
      a {
        color: #333;
      }
    }
  }
}
</style>
