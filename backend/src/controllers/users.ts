import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { isValidObjectId } from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
} from '../errors/index.js';
import {
  createUserSchema,
  listUsersQuerySchema,
  updateUserRoleSchema,
} from '../validators/users.js';

interface UserPublic {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

function toResponse(doc: {
  _id: unknown;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}): UserPublic {
  return {
    id: String(doc._id),
    firstName: doc.firstName,
    lastName: doc.lastName,
    email: doc.email,
    role: doc.role,
    createdAt: doc.createdAt as Date,
    updatedAt: doc.updatedAt as Date,
  };
}

export const listUsers: RequestHandler = async (req, res) => {
  const parsed = listUsersQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    throw new BadRequestError('Invalid query', parsed.error.flatten().fieldErrors);
  }
  const { page, limit, search } = parsed.data;

  const filter: Record<string, unknown> = {};
  if (search) {
    const rx = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    filter.$or = [{ firstName: rx }, { lastName: rx }, { email: rx }];
  }

  const [items, total] = await Promise.all([
    User.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    User.countDocuments(filter),
  ]);

  res.status(StatusCodes.OK).json({
    count: items.length,
    total,
    page,
    totalPages: Math.max(1, Math.ceil(total / limit)),
    items: items.map((d) =>
      toResponse(d as unknown as Parameters<typeof toResponse>[0])
    ),
  });
};

export const createUser: RequestHandler = async (req, res) => {
  const parsed = createUserSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new BadRequestError('Validation failed', parsed.error.flatten().fieldErrors);
  }
  const { firstName, lastName, email, password, role } = parsed.data;

  if (await User.exists({ email })) {
    throw new ConflictError('Email is already in use');
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hash,
    role: role ?? 'regular',
  });

  res
    .status(StatusCodes.CREATED)
    .json(toResponse(user as unknown as Parameters<typeof toResponse>[0]));
};

export const updateUserRole: RequestHandler = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) throw new NotFoundError('User not found');

  const parsed = updateUserRoleSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new BadRequestError('Validation failed', parsed.error.flatten().fieldErrors);
  }
  const { role } = parsed.data;

  const callerId = req.user!.userId;
  if (id === callerId && role !== 'admin') {
    throw new BadRequestError('You cannot demote yourself');
  }

  const user = await User.findById(id);
  if (!user) throw new NotFoundError('User not found');

  if (user.role === 'admin' && role !== 'admin') {
    const adminCount = await User.countDocuments({ role: 'admin' });
    if (adminCount <= 1) {
      throw new BadRequestError('At least one admin must remain');
    }
  }

  user.role = role;
  await user.save();

  res
    .status(StatusCodes.OK)
    .json(toResponse(user as unknown as Parameters<typeof toResponse>[0]));
};

export const deleteUser: RequestHandler = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) throw new NotFoundError('User not found');

  const callerId = req.user!.userId;
  if (id === callerId) {
    throw new ForbiddenError('You cannot delete your own account');
  }

  const user = await User.findById(id);
  if (!user) throw new NotFoundError('User not found');

  if (user.role === 'admin') {
    const adminCount = await User.countDocuments({ role: 'admin' });
    if (adminCount <= 1) {
      throw new BadRequestError('At least one admin must remain');
    }
  }

  await user.deleteOne();
  res.status(StatusCodes.NO_CONTENT).send();
};
