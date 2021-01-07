import { repository } from '@infrastructure/IoC';
import { mongoORM } from '@infrastructure/mongodb';
import { inject } from 'inversify';

@repository('user')
export default class UserRepository {
  constructor(@inject('mongoORM') private mongoDriver: typeof mongoORM) {}

  async insertOne(data: unknown): Promise<unknown> {
    return await this.mongoDriver.connection.collection('user').insertOne(data);
  }
}
