import { withInstall } from '@effortless-design/utils/withInstall';
import createComponent from './vue/createComponent';
import { getIconCompoent, options } from './vue/iconComponents';

import { Component } from 'vue';

const components: Component[] = [];

options.forEach(option =>
  components.push(withInstall(createComponent(option.name, option.url))),
);

const iconComponent = getIconCompoent(components);

const EfSun = iconComponent['ef-sun'];
const EfMoon = iconComponent['ef-moon'];

export { EfSun };
export { EfMoon };

export default components;
