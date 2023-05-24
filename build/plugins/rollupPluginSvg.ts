import { basename } from 'path';
import { Plugin } from 'rollup';

export const rollupPluginSvg = (): Plugin => {
  const codes = {};
  return {
    name: 'svg',
    async transform(code, id) {
      if (/.svg$/.test(basename(id))) {
        codes[id] = code;
        return { code: 'export default "empty"', map: { mappings: '' } };
      }
    },
    async generateBundle(_, bundle) {
      for (const key in bundle) {
        const output = bundle[key];
        if (/\.svg$/i.test(key)) {
          delete bundle[key];
        }
        if (output.type === 'chunk' && codes[output.facadeModuleId || '']) {
          const code = codes[output.facadeModuleId as string];
          this.emitFile({
            fileName: key,
            source: code,
            type: 'asset',
          });
        }
      }
    },
  };
};
