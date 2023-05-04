// https://vitepress.dev/guide/custom-theme
// import Layout from './Layout.vue';
import { App } from 'vue';
import { Layout } from './src';
import '@swift/theme';
import SwiftUi from '@swift/components';

export default {
  Layout,
  enhanceApp({ app }: { app: App }) {
    // ...
    app.use(SwiftUi);
  },
};
