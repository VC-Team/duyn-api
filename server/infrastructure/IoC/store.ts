import { Container } from 'inversify';

export let defaultContainer: Container = null;

export const setDefaultContainer = (container: Container): void => {
  if (!(container instanceof Container)) return null;
  defaultContainer = container;
};

export const getDefaultContainer = (): Container => {
  return defaultContainer;
};
