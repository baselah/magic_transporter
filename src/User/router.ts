import express from "express";
import { addUser, getAll, login } from "./Controller";
import { validateUser } from "../middleware/validationUserMiddleware";
const router = express.Router();

router.post("/login", login);
router.get("/", getAll);

router.use(validateUser);
router.post("/", addUser);

export default router;
