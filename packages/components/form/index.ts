import Form from './src/form.vue';
import FormItem from './src/form-item.vue';

import { withInstall } from '@pithy-ui/utils/vue';

export * from './src/hooks';
export * from './src/types';
export * from './src';

export const PtForm = withInstall(Form);
export const PtFormItem = withInstall(FormItem);
