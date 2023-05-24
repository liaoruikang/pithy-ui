import { TaskFunction } from 'gulp';
import {
  transfer,
  distMainPath,
  distTypesPath,
  swiftlyUiPath,
  distIconsPath,
  iconsPath,
  typesPath,
  resolvePath,
} from '../utils';

import { resolve } from 'path';
import { formatMap, projectName } from '../config';

const getReg = (reg: string, flags?: string): RegExp => {
  return new RegExp(reg.replace('$p', projectName), flags);
};

export const dispose = (): TaskFunction => {
  return async () => {
    await Promise.all(
      Object.keys(formatMap).map(key =>
        transfer(
          resolve(distMainPath, key, projectName),
          resolve(distMainPath, key),
          {
            search: /('|")\.\.[^'"]+('|")/g,
            target(match) {
              return `'${resolvePath(
                resolve(distMainPath, key),
                this.file.base,
                match.replace(/'|"/g, ''),
              )}'`;
            },
            isRemove: true,
            globSuffix: '**/*',
          },
        ),
      ),
    );
    await transfer(
      resolve(distTypesPath, 'packages', projectName),
      resolve(distTypesPath, 'packages'),
      {
        search: getReg(`('|")@$p[^'"]+('|")`, 'g'),
        target(match) {
          const paths: string[] = (this.file.path as string).split('\\');
          return `'${resolvePath(
            resolve(paths.slice(0, paths.length - 1).join('\\'), '..'),
            resolve(distTypesPath, 'packages'),
            match.replace(getReg(`('|"|@$p(/|\\\\))`, 'g'), ''),
          )}'`;
        },
        isRemove: true,
        globSuffix: '**/*',
      },
    );
    await transfer(
      resolve(distTypesPath, 'packages'),
      resolve(distMainPath, 'types'),
      {
        search: getReg(`('|")@$p[^'"]+('|")`, 'g'),
        target(match) {
          const paths: string[] = (this.file.path as string).split('\\');
          return `'${resolvePath(
            paths.slice(0, paths.length - 1).join('\\'),
            this.file.base,
            match.replace(getReg(`('|"|@$p(/|\\\\))`, 'g'), ''),
          )}'`;
        },
        removePath: distTypesPath,
        isRemove: true,
        globSuffix: '**/*',
      },
    );
    await transfer(
      resolve(typesPath, 'global.d.ts'),
      resolve(distMainPath, 'types'),
      {
        search: getReg(`('|")$p('|")`, 'g'),
        target: "'.'",
      },
    );
    await transfer(resolve(swiftlyUiPath, 'package.build.json'), distMainPath, {
      isRemove: false,
      rename: 'package.json',
    });
  };
};

export const iconsDispose = (): TaskFunction => {
  return async () => {
    await transfer(
      resolve(distTypesPath, 'packages', 'icons'),
      resolve(distTypesPath, 'packages'),
      {
        search: getReg(`('|")@$p[^'"]+('|")`, 'g'),
        target(match) {
          const paths: string[] = (this.file.path as string).split('\\');
          return `'${resolvePath(
            resolve(paths.slice(0, paths.length - 1).join('\\'), '..'),
            resolve(distTypesPath, 'packages'),
            match.replace(getReg(`('|"|@$p(/|\\\\))`, 'g'), ''),
          )}'`;
        },
        isRemove: true,
        globSuffix: '**/*',
      },
    );
    await transfer(
      resolve(distTypesPath, 'packages'),
      resolve(distIconsPath, 'types'),
      {
        removePath: distTypesPath,
        isRemove: true,
        globSuffix: '**/*',
      },
    );
    await transfer(
      resolve(typesPath, 'global-icons.d.ts'),
      resolve(distIconsPath, 'types'),
      {
        rename: 'global.d.ts',
        search: getReg(`('|")@$p[^'"]+('|")`, 'g'),
        target: "'.'",
      },
    );
    await transfer(resolve(iconsPath, 'package.build.json'), distIconsPath, {
      rename: 'package.json',
    });
  };
};
