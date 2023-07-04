import {
  PtIcon,
  PtSwitch,
  PtForm,
  PtFormItem,
  PtInput,
  PtInputNumber,
} from '@pithy-ui/components';
import { withInstallAll, setOptions } from '@pithy-ui/utils';
import { App } from 'vue';

export * from '@pithy-ui/components';

const components = [
  PtIcon,
  PtSwitch,
  PtForm,
  PtFormItem,
  PtInput,
  PtInputNumber,
];

export { setOptions };

export default {
  setOptions,
  install: (app: App) => withInstallAll(app, components),
};
