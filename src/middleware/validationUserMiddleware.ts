import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

export const validateUser = [
  body("name").notEmpty().withMessage("name is required"),
  body("userName").notEmpty().withMessage("userName is required"),
  body("password")
    .notEmpty()
    .isLength({ min: 8, max: 15 })
    .withMessage("password must be at lest 8 length"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().reduce((acc: any, error: any) => {
        acc[error.path] = error.msg;
        return acc;
      }, {});
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ errors: formattedErrors });
    }
    next();
  },
];
