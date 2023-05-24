import { defineConfig } from 'vitepress';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  cleanUrls: true,

  title: 'Pithy UI',
  titleTemplate: 'Vue3 framework',
  description: 'Vue3 framework',
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
      // { text: '首页', link: '/zh-CN' },
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
