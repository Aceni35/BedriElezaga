import { Router } from 'express';
import { checkAuth, requireAdmin } from '../middleware/auth.js';
import {
  createUser,
  deleteUser,
  listUsers,
  updateUserRole,
} from '../controllers/users.js';

export const usersRouter = Router();

usersRouter.use(checkAuth, requireAdmin);

usersRouter.get('/', listUsers);
usersRouter.post('/', createUser);
usersRouter.patch('/:id/role', updateUserRole);
usersRouter.delete('/:id', deleteUser);
