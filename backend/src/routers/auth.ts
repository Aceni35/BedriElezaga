import { Router } from 'express';
import { changePassword, login, register } from '../controllers/auth.js';
import { checkAuth } from '../middleware/auth.js';

export const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/change-password', checkAuth, changePassword);
