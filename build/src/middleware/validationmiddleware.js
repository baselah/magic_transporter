"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = void 0;
const validationPipe_1 = require("./validationPipe");
const http_status_1 = __importDefault(require("http-status"));
const validationMiddleware = (validationSchema) => async (req, res, next) => {
    const result = await (0, validationPipe_1.validationPipe)(validationSchema, {
        ...req.body,
        ...req.params,
    });
    if (result.length > 0) {
        const errors = result.map((error) => ({
            [error.property]: error.constraints
        }));
        return res.status(http_status_1.default.BAD_REQUEST).json({
            success: false,
            errors,
        });
    }
    next();
    return true;
};
exports.validationMiddleware = validationMiddleware;
