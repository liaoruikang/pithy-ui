import { App } from 'vue';
import EfIcon from './icon';
import EfSwitch from './switch';
import { withInstallAll } from '@effortless-design/utils/withInstall';

const components = [EfIcon, EfSwitch];

export { EfIcon, EfSwitch };

export default {
  version: 'V0.0.0',
  install: (app: App) => withInstallAll(app, components),
};
