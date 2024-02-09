"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const express_validator_1 = require("express-validator");
const http_status_1 = __importDefault(require("http-status"));
exports.validateUser = [
    (0, express_validator_1.body)("team").notEmpty().withMessage("team is required"),
    (0, express_validator_1.body)("userName").notEmpty().withMessage("userName is required"),
    // body("password")
    //   .notEmpty()
    //   .isLength({ min: 8, max: 15 })
    //   .withMessage("password must be at lest 8 length"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().reduce((acc, error) => {
                acc[error.path] = error.msg;
                return acc;
            }, {});
            return res
                .status(http_status_1.default.BAD_REQUEST)
                .json({ errors: formattedErrors });
        }
        next();
    },
];
