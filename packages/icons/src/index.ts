import { withInstall } from '@swift/utils/vue';
import createComponent, { createIconComponent } from './vue/createComponent';
import { getIconCompoent, options } from './vue/iconComponents';

import { Component } from 'vue';

const components: Component[] = [];

options.forEach(option =>
  components.push(
    withInstall(createComponent(option.name, option.url), 'icons'),
  ),
);

const iconComponent = getIconCompoent(components);

const SSun = iconComponent['s-sun'];
const SMoon = iconComponent['s-moon'];
const SLoading = iconComponent['s-loading'];
const SLoading2 = iconComponent['s-loading2'];
const SSuccess = iconComponent['s-success'];
const SError = iconComponent['s-error'];

export { SSun, SMoon, SLoading, SLoading2, SSuccess, SError };
export { createIconComponent };

export default components;
