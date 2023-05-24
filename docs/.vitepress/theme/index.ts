// https://vitepress.dev/guide/custom-theme
// import Layout from './Layout.vue';
import { App } from 'vue';
import { Layout } from './src';
import '@pithy-ui/theme';
import PithyUi from 'pithy-ui';

export default {
  Layout,
  enhanceApp({ app }: { app: App }) {
    // ...
    app.use(PithyUi);
  },
};
