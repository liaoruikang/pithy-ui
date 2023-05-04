import { createApp } from 'vue';

import SwiftUi from '@swift/components';
import SwiftUiIcons from '@swift/icons';
import '@swift/theme';

import App from './App.vue';

const app = createApp(App);

SwiftUi.setOptions({
  namespace: 'v',
});

app.use(SwiftUi);
app.use(SwiftUiIcons);

app.mount('#app');
