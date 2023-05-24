import { TaskFunction, series } from 'gulp';
import { rollup } from 'rollup';
import { getThemeOptions } from '../config';
import { resolve } from 'path';
import { transfer, themePath, withTaskName } from '../utils';

export const compileTheme = (
  input: string | string[],
  output: string,
): TaskFunction => {
  return series(
    withTaskName('transfer-scss', async () => {
      const rollupOptions = getThemeOptions(input, resolve(output, 'css'));
      const bundle = await rollup(rollupOptions.inputOptions);
      await bundle.write(rollupOptions.outputOptions);
    }),
    withTaskName('copy-scss', async () => {
      await transfer(
        resolve(themePath, '**', '!(package)*.*'),
        resolve(output, 'scss'),
      );
    }),
  );
};
