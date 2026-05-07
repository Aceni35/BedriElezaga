import type { RequestHandler } from 'express';
import { ForbiddenError, UnauthorizedError } from '../errors/index.js';
import { verifyToken } from '../helpers/jwt.js';
import { User, type UserRole } from '../models/User.js';

declare global {
  namespace Express {
    interface Request {
      user?: { userId: string; role: UserRole };
    }
  }
}

export const checkAuth: RequestHandler = async (req, _res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    throw new UnauthorizedError('Missing or invalid Authorization header');
  }

  let userId: string;
  try {
    ({ userId } = verifyToken(header.slice(7)));
  } catch {
    throw new UnauthorizedError('Invalid or expired token');
  }

  const user = await User.findById(userId).select('role').lean();
  if (!user) throw new UnauthorizedError('User no longer exists');

  req.user = { userId, role: user.role as UserRole };
  next();
};

export const requireAdmin: RequestHandler = (req, _res, next) => {
  if (req.user?.role !== 'admin') throw new ForbiddenError('Admin access required');
  next();
};
