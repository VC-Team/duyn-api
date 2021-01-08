import { UserRequest } from '@domain/usecases/authentication/verifyUser.usecase';
import { ObjectId as MongoObjectId } from 'mongoose';

export {};

declare global {
  type ObjectId = MongoObjectId;
  namespace Express {
    interface Request {
      currentUser: UserRequest;
      currentUserId: string;
      currentUserObjectId: unknown;
    }
  }
}
