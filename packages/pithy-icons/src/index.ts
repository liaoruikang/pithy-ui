import { basespace, withInstall } from '@pithy-ui/utils/vue';
import createComponent, { createIconComponent } from './vue/createComponent';
import { getIconCompoents, options } from './vue/iconComponents';

const components = options.map(option =>
  withInstall(createComponent(option.name, option.url)),
);
const iconComponents = getIconCompoents(components);
export const PtSun = iconComponents[`${basespace}-sun`];
export const PtMoon = iconComponents[`${basespace}-moon`];
export const PtLoading = iconComponents[`${basespace}-loading`];
export const PtLoading2 = iconComponents[`${basespace}-loading2`];
export const PtSuccess = iconComponents[`${basespace}-success`];
export const PtError = iconComponents[`${basespace}-error`];
export const PtAdd = iconComponents[`${basespace}-add`];
export const PtMinus = iconComponents[`${basespace}-minus`];
export { createIconComponent };
