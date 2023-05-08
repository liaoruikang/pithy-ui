import { App } from 'vue';
import SIcon from './icon';
import SSwitch from './switch';
import {
  withInstallAll,
  setOptions,
  globalOptionsType,
} from '@swift/utils/vue';

const components = [SIcon, SSwitch];

export { SIcon, SSwitch };
export { setOptions };

export default {
  version: 'V1.0.0',
  setOptions: (options: globalOptionsType) =>
    setOptions({ ...options, type: 'component' }),
  install: (app: App) => withInstallAll(app, components, 'component'),
};
