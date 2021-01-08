import { repository } from '@infrastructure/IoC';
import mongoORM from '@infrastructure/mongodb';
import { inject } from 'inversify';

@repository('user')
export default class UserRepository {
  constructor(@inject('mongoORM') private mongoDriver: mongoORM) {}

  async insertOne<T = unknown>(data: T): Promise<unknown> {
    return await this.mongoDriver.connection.model('user').create(data);
  }
}
