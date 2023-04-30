import { App } from 'vue';

import { withInstallAll } from '@effortless-design/utils/withInstall';

import components from './src';

export * from './src';

export default {
  version: 'V0.0.0',
  install: (app: App) => withInstallAll(app, components),
};
