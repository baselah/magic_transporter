import express from "express";
import { validationMiddleware } from "../../middleware/validationmiddleware";
import { addMover } from "./controller";
import { MoverDto } from "./validationDto";
const router = express.Router();



router.post("/",validationMiddleware(MoverDto), addMover);

export default router;
