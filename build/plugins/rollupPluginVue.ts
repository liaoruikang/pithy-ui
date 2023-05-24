import {
  parse,
  compileScript,
  compileStyle,
  compileTemplate,
  SFCDescriptor,
} from '@vue/compiler-sfc';
import fs from 'fs';
import { basename } from 'path';
import MagicString from 'magic-string';
import { Plugin } from 'rollup';
import { SourceMapInput } from 'rollup';
import ts from 'typescript';
import { compileString } from 'sass';

const readFile = (id: string): SFCDescriptor => {
  const source = fs.readFileSync(id).toString();
  const { descriptor } = parse(source, {
    filename: basename(id),
  });
  return descriptor;
};

const transform = (id: string) => {
  const descriptor = readFile(id);

  const scopeId = `data-v-${Date.now()}`;

  let newCode = '';

  const { content } = compileScript(descriptor, {
    id: scopeId,
    inlineTemplate: true,
  });

  if (!descriptor.scriptSetup) {
    const { code } = compileTemplate({
      source: descriptor.template?.content || '',
      id: scopeId,
      filename: basename(id),
    });
    newCode += `${code.replace('export ', '')}
                ${content.replace(/export default/, 'const __sfc__ =')}
                __sfc__.render = render;
                export default __sfc__;
                `;
  } else {
    newCode += content + ';\n';
  }

  if (
    descriptor.script?.lang === 'ts' ||
    descriptor.scriptSetup?.lang === 'ts'
  ) {
    newCode = compileTs(newCode) + '\n';
  }

  const styles: string[] = [];
  descriptor.styles.forEach(style => {
    if (style.lang === 'scss' || style.lang === 'sass') {
      const { css: code } = compileString(style.content, {
        style: 'compressed',
      });

      styles.push(code);
    } else {
      const { code } = compileStyle({
        source: style.content,
        id: scopeId,
        filename: basename(id),
        scoped: style.scoped || false,
      });

      styles.push(code);
    }
  });
  if (styles.length) {
    newCode += `(function() {
      const style = document.createElement('style');
      style.setAttribute('type', 'text/css');
      style.textContent = \`${styles.join('')}\`;
      document.head.appendChild(style);
    })()
    `;
  }

  const map = new MagicString(newCode).generateMap({
    source: basename(id),
    file: `${basename(id)}.js.map`,
    includeContent: true,
  });

  return {
    code: newCode,
    map: map as SourceMapInput,
  };
};

const compileTs = (code: string): string => {
  const result = ts.transpile(code, {
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ESNext,
  });

  return result;
};

export const rollupPluginVue = (): Plugin => {
  return {
    name: 'vue',
    async load(id: string) {
      const paths = id.split('.');
      const suffix = paths[paths.length - 1];
      if (suffix !== 'vue') return null;
      return transform(id);
    },
  };
};
