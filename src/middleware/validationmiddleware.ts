import { NextFunction, Request, Response } from "express";
import { validationPipe } from "./validationPipe";
import httpStatus from "http-status";

export const validationMiddleware =
  (validationSchema: new () => {}) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const result: any = await validationPipe(validationSchema, {
      ...req.body,
      ...req.params,
    });
    if (result.errors) {
      console.log(result);
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        ...result,
      });
    }

    next();
    return true;
  };
