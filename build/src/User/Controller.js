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
exports.login = exports.getAll = exports.addUser = void 0;
const User_1 = __importDefault(require("./User"));
const http_status_1 = __importDefault(require("http-status"));
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, team } = req.body;
        yield User_1.default.create({
            userName: userName,
            team: team,
        });
        res.status(http_status_1.default.OK).json({ result: "user add successfuly" });
    }
    catch (error) {
        res.status(http_status_1.default.BAD_REQUEST).json({ result: error.message });
    }
});
exports.addUser = addUser;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find({});
        res.status(http_status_1.default.OK).json({ result: users });
    }
    catch (error) {
        res.status(http_status_1.default.BAD_REQUEST).json({ result: error.message });
    }
});
exports.getAll = getAll;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName } = req.body;
        const user = yield User_1.default.findOne({
            userName: userName,
        });
        if (user === null)
            res.status(http_status_1.default.OK).json({ message: "user name is invalid" });
        else
            res
                .status(http_status_1.default.OK)
                .json({ result: user.userName, token: user.generateAuthToken() });
    }
    catch (error) {
        res.status(http_status_1.default.BAD_REQUEST).json({ result: error.message });
    }
});
exports.login = login;
