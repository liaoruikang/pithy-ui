import { series } from 'gulp';
import { distIconsPath, iconsPath, withTaskName } from './utils';
import { compile, run, iconsDispose } from './tasks';
import { FormatType, formatMap } from './config';
import { resolve } from 'path';

export default series(
  withTaskName('clean', run(`rd /s /q ${distIconsPath}`)),
  ...Object.keys(formatMap).map(key => {
    const map: FormatType = formatMap[key];
    return withTaskName(
      `compile-icons-${key}`,
      compile(resolve(iconsPath, 'index.ts'), resolve(distIconsPath, key), map),
    );
  }),
  withTaskName(`compile-icons-dts`, run(`pnpm tsc -p ./tsconfig.icons.json`)),
  withTaskName(`icons-after-dispose`, iconsDispose()),
);
