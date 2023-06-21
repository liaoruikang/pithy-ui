import { App } from 'vue';
import {
  PtError,
  PtLoading,
  PtLoading2,
  PtMoon,
  PtSuccess,
  PtSun,
  PtAdd,
  PtMinus,
} from './src';
import { withInstallAll, setOptions } from '@pithy-ui/utils/vue';

const components = [
  PtError,
  PtLoading,
  PtLoading2,
  PtMoon,
  PtSuccess,
  PtSun,
  PtAdd,
  PtMinus,
];

export * from './src';

export default {
  setOptions,
  install: (app: App) => withInstallAll(app, components),
};
