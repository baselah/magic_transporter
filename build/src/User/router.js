"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Controller_1 = require("./Controller");
const validationUserMiddleware_1 = require("../middleware/validationUserMiddleware");
const router = express_1.default.Router();
router.post("/login", Controller_1.login);
router.get("/", Controller_1.getAll);
router.use(validationUserMiddleware_1.validateUser);
router.post("/", Controller_1.addUser);
exports.default = router;
