import { createApp } from 'vue';

import EffortlessDesign from '@effortless-design/components';
// import EffortlessDesignIcons from '@effortless-design/icons';
import '@effortless-design/theme/src/icon/icon.scss';

import App from './App.vue';

const app = createApp(App);

console.log(EffortlessDesign);

app.use(EffortlessDesign);
// app.use(EffortlessDesignIcons);

app.mount('#app');
