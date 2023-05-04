import { App } from 'vue';

import {
  withInstallAll,
  setOptions,
  globalOptionsType,
} from '@swift/utils/vue';

import components from './src';

export * from './src';

export default {
  version: 'V1.0.0',
  setOptions: (options: globalOptionsType) =>
    setOptions({ ...options, type: 'component' }),
  install: (app: App) => withInstallAll(app, components, 'icons'),
};
