/* eslint-disable @typescript-eslint/no-explicit-any */
import glob from 'glob';
import { statSync, Stats } from 'fs';

export default function importPattern(
  pattern: string,
  root: string,
  cb?: (modules: any[], stats?: Stats[]) => any
): unknown[] {
  const files = glob.sync(pattern, {
    root,
  });

  const modules = files?.map((file) => require(file));
  const stats = files.map((file) => statSync(file));
  if (cb) {
    cb(modules, stats);
  }

  return modules;
}
