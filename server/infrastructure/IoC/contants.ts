export const METADATA_KEY = {
  useCase: 'useCase',
  controller: 'controller',
  repository: 'repository',
};

export interface MetaData {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  target: any;
}

export type UseCaseMetaData = MetaData;
export type ControllerMetaData = MetaData;
