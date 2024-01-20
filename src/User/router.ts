import express from "express";
import { addUser } from "./Controller";
import { validateUser } from "../middleware/validationUserMiddleware";
const router = express.Router();

router.use(validateUser);
router.post("/", addUser);

export default router;
