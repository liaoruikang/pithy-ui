import { Plugin } from 'rollup';
import { compile } from 'sass';
import { basename } from 'path';

export const rollupPluginScss = (): Plugin => {
  const codes = {};
  return {
    name: 'scss',
    async transform(_, id) {
      if (!/\.s[ac]ss$/i.test(id)) return Promise.resolve();

      if (/^_/.test(basename(id))) return 'empty';
      const { css } = compile(id, { style: 'compressed' });
      codes[id] = css;
      return 'empty';
    },
    async generateBundle(_, bundle) {
      for (const key in bundle) {
        const output = bundle[key];
        if (/\.s[ac]ss$/i.test(key) || /^_.+\.s[ac]ss$/.test(basename(key))) {
          delete bundle[key];
        }
        if (output.type === 'chunk' && codes[output.facadeModuleId || '']) {
          const css = codes[output.facadeModuleId as string];
          this.emitFile({
            fileName: key.replace(/\.s[ac]ss$/i, '.css'),
            source: css,
            type: 'asset',
          });
        }
      }
    },
  };
};
