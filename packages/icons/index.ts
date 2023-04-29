import { App } from 'vue';

import { withInstallAll } from '@effortless-design/utils/withInstall';
import EfSun from './sun';

const components = [EfSun];

export { EfSun };

export default {
  version: 'V0.0.0',
  install: (app: App) => withInstallAll(app, components),
};
