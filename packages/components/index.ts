import { App } from 'vue';
import EfIcon from './icon';
import { withInstallAll } from '@effortless-design/utils/withInstall';

const components = [EfIcon];

export { EfIcon };

export default {
  version: 'V0.0.0',
  install: (app: App) => withInstallAll(app, components),
};
