import { inject, injectable } from 'inversify';
import mongoose from 'mongoose';
import { Logger } from 'pino';
@injectable()
export default class MongoORM {
  connection: mongoose.Connection;
  constructor(@inject('logger') private logger: Logger) {}

  async connect(): Promise<void> {
    const URI = process.env.MONGO_URI;

    await mongoose
      .connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        this.logger.info('Mongo Connected');
        this.connection = mongoose.connection;
      });
  }
}
