// errorMiddleware.js
import httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';
import { Error } from 'mongoose';

export const ErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);
  if ((err as any).code === 11000) {
    const keyValue = (err as any).keyValue;
    const key = Object.keys(keyValue)[0];
    res.status(httpStatus.BAD_REQUEST).json({
      error: `Unique constraint failed on the field: ${key}`,
    });
  } else {
    res.status(httpStatus.BAD_REQUEST).json({
      error: err.message,
    });
  }
};
