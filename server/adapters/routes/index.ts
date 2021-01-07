import Statistics from '@adapters/controllers/statistics.controller';
import { useController } from '@infrastructure/IoC/extentions';
import { Application } from 'express';

export default function routes(app: Application): void {
  app.use(
    '/api/v1/healcheck',
    useController<Statistics>('statistics').healcheck
  );
}
