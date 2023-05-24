import { InputOption, InputOptions, ModuleFormat, OutputOptions } from 'rollup';
import typescript from 'rollup-plugin-typescript2';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import path, { basename } from 'path';
import { rollupPluginVue as vue, rollupPluginSvg as svg } from '../plugins';
import { rootPath } from '../utils';

export interface BuildRollupOptions {
  inputOptions: InputOptions;
  outputOptions: OutputOptions;
}

export interface FormatType {
  suffix: 'js' | 'cjs' | 'mjs';
  format: ModuleFormat;
}

interface FormatMapType {
  lib: FormatType;
  es: FormatType;
}

export const formatMap: FormatMapType = {
  lib: {
    suffix: 'js',
    format: 'cjs',
  },
  es: {
    suffix: 'mjs',
    format: 'esm',
  },
};

export const getMainOptions = (
  input: InputOption,
  output: string,
  map: FormatType = formatMap.es,
): BuildRollupOptions => {
  const inputOptions: InputOptions = {
    input,
    external: ['vue', /@pithy-ui\/icons/],
    plugins: [
      resolve(),
      vue(),
      svg(),
      typescript({
        tsconfig: path.resolve(rootPath, 'tsconfig.web.json'),
        include: ['*.ts+(|x)', '**/*.ts+(|x)'],
      }),
      babel({
        babelHelpers: 'bundled',
        plugins: [
          ['@vue/babel-plugin-jsx', { mergeProps: false, vModel: true }],
        ],
        extensions: ['.tsx'],
      }),
      commonjs(),
    ],
  };
  const outputOptions: OutputOptions = {
    dir: output,
    format: map.format,
    sourcemap: true,
    exports: 'named',
    compact: true,
    preserveModules: true,
    entryFileNames(chunkInfo) {
      if (/\.svg$/i.test(basename(chunkInfo.facadeModuleId || '')))
        return '[name][extname]';

      const suffix = map.suffix;
      return `${chunkInfo.name}.${suffix}`;
    },
  };
  return {
    inputOptions,
    outputOptions,
  };
};
