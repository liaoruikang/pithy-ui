import { InputOption, InputOptions, OutputOptions } from 'rollup';
import { BuildRollupOptions } from './main';
import { rollupPluginScss as scss } from '../plugins';

export const getThemeOptions = (
  input: InputOption,
  output: string,
): BuildRollupOptions => {
  const inputOptions: InputOptions = {
    input,
    plugins: [scss()],
  };
  const outputOptions: OutputOptions = {
    dir: output,
    preserveModules: true,
    entryFileNames: '[name][extname]',
  };
  return {
    inputOptions,
    outputOptions,
  };
};
