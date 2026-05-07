import jwt, { type SignOptions } from 'jsonwebtoken';

export type JwtPayload = { userId: string };

export function signToken(payload: JwtPayload): string {
  const secret = process.env.JWT_SECRET as string;
  const expiresIn = (process.env.JWT_LIFETIME ?? '7d') as SignOptions['expiresIn'];
  return jwt.sign(payload, secret, { expiresIn });
}

export function verifyToken(token: string): JwtPayload {
  const secret = process.env.JWT_SECRET as string;
  return jwt.verify(token, secret) as JwtPayload;
}
