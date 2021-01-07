import { decorate, injectable, Container } from 'inversify';
import {
  UseCaseMetaData,
  MetaData,
  METADATA_KEY,
  ControllerMetaData,
} from './contants';
import { getDefaultContainer } from './store';

function decoratorsByType(
  type: keyof typeof METADATA_KEY,
  metaData: unknown,
  target: unknown
) {
  decorate(injectable(), target);
  Reflect.defineMetadata(METADATA_KEY[type], metaData, target);
  const previousMetadata: unknown[] =
    Reflect.getMetadata(METADATA_KEY[type], Reflect) || [];

  const newMetadata = [metaData, ...previousMetadata];
  Reflect.defineMetadata(METADATA_KEY[type], newMetadata, Reflect);
}

export function useCase(name: string) {
  return function (target: unknown): void {
    const currentMetadata: UseCaseMetaData = {
      name,
      target,
    };

    decoratorsByType('useCase', currentMetadata, target);
  };
}

export function controller(name: string) {
  return function (target: unknown): void {
    const currentMetadata: ControllerMetaData = {
      name,
      target,
    };

    decoratorsByType('controller', currentMetadata, target);
  };
}

export function repository(name: string) {
  return function (target: unknown): void {
    const currentMetadata: MetaData = {
      name,
      target,
    };

    decoratorsByType('repository', currentMetadata, target);
  };
}

export function getMetadataByType(type: keyof typeof METADATA_KEY): unknown[] {
  return Reflect.getMetadata(METADATA_KEY[type], Reflect);
}

export function containerBindByType(
  type: keyof typeof METADATA_KEY,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  target: any,
  container: Container = getDefaultContainer()
): void {
  const metaTarget = Reflect.getMetadata(type, target) as MetaData;
  if (!metaTarget) return;
  container
    .bind<typeof target>(`${METADATA_KEY[type]}.${metaTarget.name}`)
    .to(target);
}

export function containerBindModuleByType(
  type: keyof typeof METADATA_KEY,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  module: any,
  container: Container = getDefaultContainer()
): void {
  const metaTarget = Reflect.getMetadata(type, module) as MetaData;
  container
    .bind<typeof module>(`${METADATA_KEY[type]}.${metaTarget.name}`)
    .to(module);
}
