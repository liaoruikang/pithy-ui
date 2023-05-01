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
const EfLoading = iconComponent['ef-loading'];
const EfLoading2 = iconComponent['ef-loading2'];
const EfSuccess = iconComponent['ef-success'];
const EfError = iconComponent['ef-error'];

export { EfSun, EfMoon, EfLoading, EfLoading2, EfSuccess, EfError };

export default components;
