import { InputOption, rollup } from 'rollup';
import { TaskFunction } from 'gulp';
import { getMainOptions, FormatType, formatMap } from '../config';

export const compile = (
  input: InputOption,
  output: string,
  map: FormatType = formatMap.es,
): TaskFunction => {
  return async () => {
    try {
      const rollupOptions = getMainOptions(input, output, map);
      const bundle = await rollup(rollupOptions.inputOptions);
      await bundle.write(rollupOptions.outputOptions);
    } catch (error) {
      console.log(error);
      throw '1';
    }
  };
};
