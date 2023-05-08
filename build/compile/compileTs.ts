import { rollup } from 'rollup';
import { TaskFunction } from 'gulp';
import { createGlobPath, getBuildRollupOptions } from '../utils';

export const compileTs = (
  path: string,
  enter: string | string[] = 'index.ts',
  output: string | string[] = ['..', 'dist'],
): TaskFunction => {
  return async () => {
    const { enterPath, outputPath } = createGlobPath(path, enter, output);

    const rollupOptions = getBuildRollupOptions(enterPath, outputPath);

    const bundle = await rollup(rollupOptions.inputOptions);
    console.log(rollupOptions);

    for (const outputOptions of rollupOptions.outputOptions) {
      await bundle.write(outputOptions);
    }
  };
};
