// https://vitepress.dev/guide/custom-theme
// import Layout from './Layout.vue';
import { App } from 'vue';
import { Layout } from './src';

export default {
  Layout,
  enhanceApp({ app }: { app: App }) {
    // ...
    console.log(app);
  },
};
