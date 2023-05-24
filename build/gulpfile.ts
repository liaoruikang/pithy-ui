import { series } from 'gulp';
import {
  withTaskName,
  swiftlyUiPath,
  distMainPath,
  themePath,
  distThemePath,
} from './utils';
import { formatMap, FormatType } from './config';
import { dispose, compile, compileTheme, run } from './tasks';
import { resolve } from 'path';
import { globSync } from 'glob';

const themePaths = globSync('**/*.{scss,sass}', {
  cwd: themePath,
}).map(path => resolve(themePath, path));

export default series(
  withTaskName('clean', run(`rd /s /q ${distMainPath}`)),
  ...Object.keys(formatMap).map(key => {
    const map: FormatType = formatMap[key];
    return withTaskName(
      `compile-${key}`,
      compile(
        resolve(swiftlyUiPath, 'index.ts'),
        resolve(distMainPath, key),
        map,
      ),
    );
  }),
  withTaskName(`compile-theme`, compileTheme(themePaths, distThemePath)),
  withTaskName(`compile-dts`, run(`pnpm vue-tsc -p ./tsconfig.type.json`)),
  withTaskName(`after-dispose`, dispose()),
);
