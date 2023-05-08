<template>
  <div class="vp-nav">
    <ul class="vp-menu__normal">
      <li
        class="vp-menu__item"
        :class="{
          'is-active': currentPath == item.link,
        }"
        v-for="item in theme.nav"
        :key="item.link">
        <a :href="item.link">{{ item.text }}</a>
      </li>
      <s-switch v-model="drakTheme">
        <template #check-active> <s-moon></s-moon> </template>

        <template #check-inactive> <s-sun></s-sun> </template>
      </s-switch>
    </ul>
    <div class="vp-link__icon">
      <s-icon
        custom-icon="/github.svg"
        class="vp-link__github"
        @click="jump('https://github.com/liaoruikang/swift-ui')">
      </s-icon>
    </div>
    <div class="vp-menu__small">
      <div
        class="vp-menu__icon"
        @click="menuActive = !menuActive"
        :class="{
          'is-active': menuActive,
        }">
        <span class="vp-menu__icon--item"></span>
        <span class="vp-menu__icon--item"></span>
        <span class="vp-menu__icon--item"></span>
      </div>
      <div
        class="vp-menu__box"
        :class="{
          'is-active': menuActive,
        }">
        <ul class="vp-menu__content">
          <li
            class="vp-menu__item"
            :class="{
              'is-active': currentPath == item.link,
            }"
            v-for="item in theme.nav"
            :key="item.link">
            <a :href="item.link">{{ item.text }}</a>
          </li>
          <li class="vp-menu__item vp-menu__theme">
            <span> 主题 </span>
            <s-switch v-model="drakTheme">
              <template #check-active>
                <s-moon></s-moon>
              </template>

              <template #check-inactive>
                <s-sun></s-sun>
              </template>
            </s-switch>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { useData, useRoute } from 'vitepress';
import { computed, defineComponent, ref } from 'vue';
import { useDrak } from '@swift/hooks';
import { SSun, SMoon } from '@swift/icons';
export default defineComponent({
  name: 'vp-navbar',
  components: { SMoon, SSun },
  setup() {
    const { theme } = useData();
    const route = useRoute();
    const currentPath = computed(() => route.path.split('.')[0]);

    const drakTheme = useDrak(false);

    const menuActive = ref<boolean>(false);

    const jump = (url: string) => {
      open(url, '_blank');
    };

    return { theme, currentPath, drakTheme, jump, menuActive };
  },
});
</script>
<style lang="scss" scoped>
@use '../../styles/mixins/reactive' as *;
@use '../../styles/mixins/mixins' as *;
@use '../../styles/function/function' as *;
@use '../../styles/common/config' as *;

@include b('nav') {
  @include center_flex('vertical');

  height: 100%;

  @include viewport_to_small {
    @include b('menu', 'normal') {
      display: none !important;
    }
    @include b('menu', 'small') {
      display: block !important;
    }
  }
  @include b('menu', 'normal') {
    display: flex;
    height: 100%;

    @include b('menu', 'item') {
      display: flex;
      align-items: center;
      vertical-align: middle;
      padding: 0 15px;
      height: 100%;
      border-bottom: 2px solid transparent;
      box-sizing: border-box;
      @include transition(border-bottom);

      @include b($this: &, $state: 'active') {
        border-bottom: 1px solid get_var(primary-color);
      }
      a {
        color: get_var(text-color);
      }
    }
    :deep(.s-switch) {
      padding: 0 15px;
      transform: scale(0.875);
    }
  }
  @include b('menu', 'small') {
    display: none;
    margin-right: 10px;
    @include b('menu', 'icon') {
      display: flex;
      width: 18px;
      height: 16px;
      justify-content: end;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;

      &--item {
        display: block;
        height: 2px;
        background-color: get_var(text-color);
        @include transition((width, transform));
      }

      --item1-width: 100%;
      --item2-width: 45%;
      --item3-width: 55%;

      &--item:nth-child(1) {
        width: var(--item1-width);
      }
      &--item:nth-child(2) {
        width: var(--item2-width);
      }
      &--item:nth-child(3) {
        width: var(--item3-width);
      }

      &:hover {
        --item1-width: 45%;
        --item2-width: 100%;
        --item3-width: 55%;
      }
      &.#{$state-prefix}active {
        --item1-width: 45% !important;
        --item2-width: 100% !important;
        --item3-width: 55% !important;
        .vp-menu__icon--item:nth-child(1) {
          transform: translate(2px, 3.5px) rotate(45deg);
        }
        .vp-menu__icon--item:nth-child(2) {
          transform: rotate(-45deg);
        }
        .vp-menu__icon--item:nth-child(3) {
          transform: translate(7px, -4.5px) rotate(45deg);
        }
      }
    }

    @include b('menu', 'box') {
      position: fixed;
      top: 51px;
      left: 0;
      width: 100%;
      height: 0;
      overflow: hidden;
      background-color: var(--s-bg-color);

      @include transition(height);

      &.#{$state-prefix}active {
        height: calc(100vh - 51px);
      }

      @include b('menu', 'content') {
        box-sizing: border-box;
        padding: 20px 0;
        width: 50%;
        // background-color: red;
        height: 100%;
        margin: 0 auto;
        .vp-menu__item {
          height: 40px;
          border-bottom: 1px solid get_var(bd-color);
          line-height: 40px;
          box-sizing: border-box;
          padding: 0 10px;
          @include b($this: &, $state: 'active') {
            a {
              color: get_var(primary-color);
            }
          }
          a {
            color: get_var(text-color);
            @include transition(color);
            &:hover {
              color: get_var(primary-color);
            }
          }
        }
        .vp-menu__theme {
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 0;
          background-color: get_var(bg-color);
          border-radius: 6px;

          @include transition(background-color);

          span {
            color: get_var(text-color);
            @include transition(color);
          }
        }
      }
    }
  }

  @include b('link', 'icon') {
    @include center_flex('vertical');
    margin: 0 15px;
    @include b('link', 'github') {
      font-size: 24px !important;
      color: get_var(text-color);
      cursor: pointer;
    }
  }
}
</style>
