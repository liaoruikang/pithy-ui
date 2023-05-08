import { resolve } from 'path';
import { InputOptions, OutputOptions } from 'rollup';
import babel from 'rollup-plugin-babel';
import typescript from '@rollup/plugin-typescript';
import { buildPath } from './paths';

// import vue from 'rollup-plugin-vue';
// import babel from 'rollup-plugin-babel';

export interface BuildRollupOptions {
  inputOptions: InputOptions;
  outputOptions: OutputOptions[];
}

export const getBuildRollupOptions = (
  input: string,
  output: string,
): BuildRollupOptions => {
  const inputOptions: InputOptions = {
    input,
    external: ['vue'],

    plugins: [
      // typescript({ tsconfig: resolve(buildPath, 'tsconfig.json') }),
      babel({
        extensions: ['.ts', '.tsx'],
      }),
    ],
  };
  const outputOptions: OutputOptions[] = [
    {
      file: resolve(output, 'bundle.min.cjs'),
      format: 'cjs',
      sourcemap: true,
      exports: 'auto',
      compact: true,
      plugins: [],
    },
    {
      file: resolve(output, 'bundle.min.mjs'),
      format: 'es',
      sourcemap: true,
      exports: 'auto',
      compact: true,
      plugins: [],
    },
  ];
  return {
    inputOptions,
    outputOptions,
  };
};
