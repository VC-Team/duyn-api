import mongoose from 'mongoose';

export default async function connect(): Promise<void> {
  const URI = process.env.MONGO_URI;
  await mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export const mongoORM = mongoose;
