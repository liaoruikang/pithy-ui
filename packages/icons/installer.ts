import { App } from 'vue';
import {
  PtError,
  PtLoading,
  PtLoading2,
  PtMoon,
  PtSuccess,
  PtSun,
} from './src';
import { withInstallAll, setOptions } from '@pithy-ui/utils/vue';

const components = [PtError, PtLoading, PtLoading2, PtMoon, PtSuccess, PtSun];

export * from './src';

export default {
  setOptions,
  install: (app: App) => withInstallAll(app, components),
};
