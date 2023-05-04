import { defineConfig } from 'vitepress';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Effortless',
  titleTemplate: 'Vue 3 UI 框架',
  description: 'Vue 3 UI 框架',
  lastUpdated: true,

  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/logo-small.svg',
        type: 'image/svg+xm',
      },
    ],
  ],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: '指南', link: '/guide' },
      { text: '组件', link: '/components' },
      { text: '工具', link: '/utils' },
      { text: 'Hooks', link: '/hooks' },
    ],
  },
  vite: {
    plugins: [vueJsx()],
  },
});
