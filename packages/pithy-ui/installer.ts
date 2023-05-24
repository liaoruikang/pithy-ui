import { PtIcon, PtSwitch } from '@pithy-ui/components';
import { withInstallAll, setOptions } from '@pithy-ui/utils/vue';
import { App } from 'vue';

const components = [PtIcon, PtSwitch];
export { PtIcon, PtSwitch };
export { setOptions };

export default {
  setOptions,
  install: (app: App) => withInstallAll(app, components),
};
