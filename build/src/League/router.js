"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Controller_1 = require("./Controller");
const validationLeagueMiddleware_1 = require("../middleware/validationLeagueMiddleware");
const router = express_1.default.Router();
router.use(validationLeagueMiddleware_1.validateLeague);
router.post("/", Controller_1.add);
exports.default = router;
