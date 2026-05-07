import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { signToken } from '../helpers/jwt.js';
import { BadRequestError, ConflictError, UnauthorizedError } from '../errors/index.js';
import { changePasswordSchema, loginSchema, registerSchema } from '../validators/auth.js';

export const register: RequestHandler = async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new BadRequestError('Validation failed', parsed.error.flatten().fieldErrors);
  }
  const { firstName, lastName, email, password } = parsed.data;

  if (await User.exists({ email })) {
    throw new ConflictError('Email is already in use');
  }

  const isFirstUser = (await User.estimatedDocumentCount()) === 0;
  const role = isFirstUser ? 'admin' : 'regular';

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ firstName, lastName, email, password: hash, role });
  const token = signToken({ userId: user._id.toString() });

  res.status(StatusCodes.CREATED).json({
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
    token,
  });
};

export const login: RequestHandler = async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new BadRequestError('Validation failed', parsed.error.flatten().fieldErrors);
  }
  const { email, password } = parsed.data;

  const user = await User.findOne({ email });
  if (!user) throw new UnauthorizedError('Invalid email or password');

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new UnauthorizedError('Invalid email or password');

  const token = signToken({ userId: user._id.toString() });

  res.status(StatusCodes.OK).json({
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
    token,
  });
};

export const changePassword: RequestHandler = async (req, res) => {
  const parsed = changePasswordSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new BadRequestError('Validation failed', parsed.error.flatten().fieldErrors);
  }
  const { currentPassword, newPassword } = parsed.data;

  if (currentPassword === newPassword) {
    throw new BadRequestError('New password must be different from current password');
  }

  const user = await User.findById(req.user!.userId);
  if (!user) throw new UnauthorizedError('User no longer exists');

  const ok = await bcrypt.compare(currentPassword, user.password);
  if (!ok) throw new UnauthorizedError('Current password is incorrect');

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.status(StatusCodes.NO_CONTENT).send();
};
