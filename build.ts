import s from 'shelljs';
import config from './tsconfig.json';
const outDir = config.compilerOptions.outDir;

s.rm('-rf', outDir);
s.mkdir(outDir);
s.cp('.env', `${outDir}/.env`);
s.mkdir('-p', `${outDir}/infrastructure/http`);
s.mkdir('-p', `${outDir}/infrastructure/swagger`);
s.cp(
  'server/infrastructure/http/api.yml',
  `${outDir}/infrastructure/http/api.yml`
);
