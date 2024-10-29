import { NextFunction, Request, Response } from 'express';
import { validationPipe } from './validationPipe';
import httpStatus from 'http-status';

export const validationMiddleware =
  (validationSchema: new () => {}) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const result: any = await validationPipe(validationSchema, {
      ...req.body,
      ...req.params,
    });

    if (result.length > 0) {
      const errors = result.map(
        (error: {
          property: any;
          target: any;
          value: any;
          constraints: any;
        }) => ({
          [error.property]: error.constraints,
        }),
      );
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        errors,
      });
    }

    next();
    return true;
  };
