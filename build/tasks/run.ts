import { exec } from 'child_process';
import { TaskFunction, TaskFunctionCallback } from 'gulp';
import { rootPath } from '../utils';
import { existsSync } from 'fs';

export const run = (cmd: string, cwd: string = rootPath): TaskFunction => {
  return (taskCallback: TaskFunctionCallback) => {
    if (/rd\s\/s\s\/q/.test(cmd)) {
      const path = cmd.split(' ')[3];
      if (!existsSync(path)) return taskCallback();
    }
    exec(
      cmd,
      {
        cwd,
      },
      taskCallback,
    );
  };
};
