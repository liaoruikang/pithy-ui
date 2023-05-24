import { dest, src } from 'gulp';
import replace from 'gulp-replace';
import rename from 'gulp-rename';
import { exec } from 'child_process';
import path from 'path';
import { accessSync } from 'fs';

export interface transferOptions {
  search?: string | RegExp;
  target?: string | ((match: string) => string);
  removePath?: string;
  isRemove?: boolean;
  globSuffix?: string;
  rename?: string;
}

export const transfer = (
  input: string | string[],
  output: string,
  options: transferOptions = {},
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const inputs = typeof input === 'string' ? [input] : input;

    let stream = src(
      inputs.map(input =>
        options.globSuffix ? path.resolve(input, options.globSuffix) : input,
      ),
    );
    if (options.search !== undefined && options.target !== undefined) {
      stream = stream.pipe(replace(options.search, options.target));
    }
    if (options.rename) {
      stream = stream.pipe(rename(options.rename));
    }
    stream.pipe(dest(output)).on('end', () => {
      if (options.isRemove) {
        exec(`rd /s /q ${options.removePath || input}`, error => {
          if (!error) resolve();
          reject(error);
        });
      } else {
        resolve();
      }
    });
  });
};

const relative = path.relative;
const resolve = path.resolve;

export function resolvePath(
  path: string,
  rootPath: string,
  match: string,
): string {
  try {
    let newPath = resolve(rootPath, match);
    accessSync(newPath);
    newPath = relative(path, newPath).replace(/\\/g, '/');
    if (!/^\./.test(newPath)) newPath = `./${newPath}`;
    return newPath;
  } catch {
    return match;
  }
}
