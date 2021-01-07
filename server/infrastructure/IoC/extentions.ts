import { Container } from 'inversify';
import { METADATA_KEY } from './contants';
import { getDefaultContainer } from './store';

export function useController<T = unknown>(
  name: string,
  container: Container = getDefaultContainer()
): T {
  return container.get(`${METADATA_KEY.controller}.${name}`);
}
