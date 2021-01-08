import path from 'path';

import container from '@infrastructure/config/IoC';
import importPattern from '@infrastructure/filesytem/importPattern';
import { containerBindByType, setDefaultContainer } from '@infrastructure/IoC';
import { ContainerModule } from 'inversify';
import MongoORM from '@infrastructure/mongodb';
import logger from '@infrastructure/logger';

setDefaultContainer(container);

const thirdPartyDependencies = new ContainerModule((bind) => {
  bind<typeof logger>('logger').toConstantValue(logger);
  bind<MongoORM>('mongoORM').toConstantValue(new MongoORM(logger));
});

container.load(thirdPartyDependencies);

importPattern(
  '/**/*.entity.{js,ts}',
  path.join(__dirname, 'domain', 'entities')
);

importPattern(
  '/**/*.usecase.{js,ts}',
  path.join(__dirname, 'domain', 'usecases'),
  (modules) => {
    modules.map((module) => {
      const m = module?.default || module;
      containerBindByType('useCase', m);
    });
  }
);

importPattern(
  '/**/*.middleware.{js,ts}',
  path.join(__dirname, 'adapters', 'middleware')
);

importPattern(
  '/**/*.controller.{js,ts}',
  path.join(__dirname, 'adapters', 'controllers'),
  (modules) => {
    modules.map((module) => {
      const m = module?.default || module;
      containerBindByType('controller', m);
    });
  }
);

importPattern(
  '/**/*.repository.{js,ts}',
  path.join(__dirname, 'repository'),
  (modules) => {
    modules.map((module) => {
      const m = module?.default || module;
      containerBindByType('controller', m);
    });
  }
);
