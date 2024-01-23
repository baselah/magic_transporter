import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

export const validateLeague = [
  body("name").notEmpty().withMessage("name is required"),
  body('date').custom((value) => {
    // Add your custom date format validation logic here
    // For example, let's check if it's a valid YYYY-MM-DD format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(value)) {
      throw new Error('Invalid date format. Use YYYY-MM-DD');
    }
    return true;
  }),
    
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
