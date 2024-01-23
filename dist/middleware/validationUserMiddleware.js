import { body, validationResult } from "express-validator";
import httpStatus from "http-status";
export const validateUser = [
    body("team").notEmpty().withMessage("team is required"),
    body("userName").notEmpty().withMessage("userName is required"),
    // body("password")
    //   .notEmpty()
    //   .isLength({ min: 8, max: 15 })
    //   .withMessage("password must be at lest 8 length"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().reduce((acc, error) => {
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
//# sourceMappingURL=validationUserMiddleware.js.map