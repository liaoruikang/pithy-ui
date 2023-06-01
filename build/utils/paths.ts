import { resolve } from 'path';
import { projectIconsName, projectName } from '../config';

export const rootPath = resolve(__dirname, '..', '..');
export const pkgPath = resolve(rootPath, 'packages');
export const distPath = resolve(rootPath, 'dist');
export const typesPath = resolve(rootPath, 'types');

export const swiftlyUiPath = resolve(pkgPath, projectName);
export const distMainPath = resolve(distPath, projectName);

export const iconsPath = resolve(pkgPath, projectIconsName);
export const distIconsPath = resolve(distPath, projectIconsName);

export const themePath = resolve(pkgPath, 'theme');
export const distThemePath = resolve(distMainPath, 'theme');

export const distTypesPath = resolve(distPath, 'types');
