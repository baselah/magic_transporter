import express from "express";
import { add } from "./Controller";
import { validateLeague } from "../middleware/validationLeagueMiddleware";
const router = express.Router();


router.use(validateLeague);
router.post("/", add);

export default router;
