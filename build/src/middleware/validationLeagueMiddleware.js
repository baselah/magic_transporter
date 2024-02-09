"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLeague = void 0;
const express_validator_1 = require("express-validator");
const http_status_1 = __importDefault(require("http-status"));
exports.validateLeague = [
    (0, express_validator_1.body)("name").notEmpty().withMessage("name is required"),
    (0, express_validator_1.body)('date').custom((value) => {
        // Add your custom date format validation logic here
        // For example, let's check if it's a valid YYYY-MM-DD format
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(value)) {
            throw new Error('Invalid date format. Use YYYY-MM-DD');
        }
        return true;
    }),
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
