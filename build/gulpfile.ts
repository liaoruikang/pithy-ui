import { series, task } from 'gulp';
import { withTaskName } from './utils';
import { compileTs } from './compile';

export default task(
  'default',
  series(
    // withTaskName('compile-vue', compileVue(componentPath)),
    withTaskName('compile-(ts|tsx)', compileTs('./a.tsx', '')),
  ),
);
