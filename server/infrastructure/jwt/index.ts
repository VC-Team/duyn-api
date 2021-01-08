import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';

interface SignOption {
  expiresIn?: number | string;
}

@injectable()
export default class Jwt {
  private static secretKey = process.env.JWT_SECRET;

  static async sign(
    // eslint-disable-next-line @typescript-eslint/ban-types
    payload: string | object | Buffer,
    option?: SignOption
  ): Promise<string> {
    return jwt.sign(payload, Jwt.secretKey, option);
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  static async verify(token: string): Promise<string | object> {
    return jwt.verify(token, Jwt.secretKey);
  }
}
