import { resolve } from 'path';

export const rootPath = resolve(__dirname, '..', '..');
export const pkgPath = resolve(rootPath, 'packages');
export const componentPath = resolve(pkgPath, 'components');

export const buildPath = resolve(rootPath, 'build');

export const componentDistPath = resolve(componentPath, 'dist');
