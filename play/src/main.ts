import { createApp } from 'vue';

import PithyUi from '../../dist/pithy-ui';
import PithyIcons from '../../dist/pithy-icons';
import './index.scss';

// PithyUi.setOptions({
//   namespace: 's',
//   style: true,
// });

import App from './App.vue';

const app = createApp(App);

app.use(PithyUi);
app.use(PithyIcons);

app.mount('#app');
