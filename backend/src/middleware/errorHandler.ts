import type { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../errors/CustomError.js';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ msg: err.message, details: err.details ?? null });
    return;
  }

  console.error(err);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Something went wrong, please try again' });
};
