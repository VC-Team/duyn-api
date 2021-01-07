import path from 'path';

import container from '@infrastructure/config/IoC';
import importPattern from '@infrastructure/filesytem/importPattern';
import { containerBindByType, setDefaultContainer } from '@infrastructure/IoC';
import { ContainerModule } from 'inversify';
import { mongoORM } from '@infrastructure/mongodb';

setDefaultContainer(container);

importPattern(
  '/**/*.entity.ts',
  path.join(process.cwd(), 'server', 'domain', 'entities')
);

importPattern(
  '/**/*.usecase.ts',
  path.join(process.cwd(), 'server', 'domain', 'usecases'),
  (modules) => {
    modules.map((module) => {
      const m = module?.default || module;
      containerBindByType('useCase', m);
    });
  }
);

importPattern(
  '/**/*.middleware.ts',
  path.join(process.cwd(), 'server', 'adapters', 'middleware')
);

importPattern(
  '/**/*.controller.ts',
  path.join(process.cwd(), 'server', 'adapters', 'controllers'),
  (modules) => {
    modules.map((module) => {
      const m = module?.default || module;
      containerBindByType('controller', m);
    });
  }
);

importPattern(
  '/**/*.repository.ts',
  path.join(process.cwd(), 'server', 'repository'),
  (modules) => {
    modules.map((module) => {
      const m = module?.default || module;
      containerBindByType('controller', m);
    });
  }
);

const thirdPartyDependencies = new ContainerModule((bind) => {
  bind<typeof mongoORM>('mongoORM').toConstantValue(mongoORM);
});

container.load(thirdPartyDependencies);
