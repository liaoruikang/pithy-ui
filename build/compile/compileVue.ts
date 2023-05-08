import { TaskFunction, src, dest } from 'gulp';
import { createGlobPath } from '../utils';
import rename from 'gulp-rename';

// import vueFile from 'gulp-vue-file';
// import source from 'vinyl-source-stream';

// import browserify from 'browserify';

import vueify from 'gulp-vueify';
// import rename from 'gulp-rename';
// import ts from 'gulp-typescript';
// import { resolve } from 'path';
// import babel from 'gulp-babel';
// import uglify from 'gulp-uglify';

// const tsProject = ts.createProject(resolve(buildPath, 'tsconfig.ts'));

export const compileVue = (
  path: string,
  enter: string | string[] = ['**', '*.vue'],
  output: string | string[] = 'dist',
): TaskFunction => {
  return taskCallback => {
    const { enterPath, outputPath } = createGlobPath(path, enter, output);

    // browserify(enterPath)
    //   .transform(vueify)
    //   .bundle()
    //   .pipe(source('bundle.js'))
    //   .pipe(dest(outputPath))
    //   .on('end', taskCallback);

    src(enterPath)
      .pipe(vueify())
      .pipe(rename({ extname: '.ts' }))
      .pipe(dest(outputPath))
      .on('end', taskCallback);
  };
};
