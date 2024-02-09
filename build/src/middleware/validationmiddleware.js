"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = void 0;
const validationPipe_1 = require("./validationPipe");
const http_status_1 = __importDefault(require("http-status"));
const validationMiddleware = (validationSchema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, validationPipe_1.validationPipe)(validationSchema, Object.assign(Object.assign({}, req.body), req.params));
    if (result.errors) {
        console.log(result);
        return res.status(http_status_1.default.BAD_REQUEST).json(Object.assign({ success: false }, result));
    }
    next();
    return true;
});
exports.validationMiddleware = validationMiddleware;
