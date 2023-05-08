import { resolve } from 'path';

export type globPath = { enterPath: string; outputPath: string };

export const createGlobPath = (
  path: string,
  enter: string | string[],
  output: string | string[],
): globPath => {
  const outputPath = resolve.apply(null, [path, ..._normalization(output)]);
  const enterPath = resolve.apply(null, [path, ..._normalization(enter)]);
  return {
    enterPath,
    outputPath,
  };
};

const _normalization = (path: string | string[]): string[] => {
  if (typeof path == 'string') {
    return [path];
  } else {
    return path;
  }
};
