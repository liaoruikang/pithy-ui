import { PtIcon, PtSwitch, PtForm, PtFormItem } from '@pithy-ui/components';
import { withInstallAll, setOptions } from '@pithy-ui/utils/vue';
import { App } from 'vue';

const components = [PtIcon, PtSwitch, PtForm, PtFormItem];
export { PtIcon, PtSwitch, PtForm, PtFormItem };
export { setOptions };

export default {
  setOptions,
  install: (app: App) => withInstallAll(app, components),
};
