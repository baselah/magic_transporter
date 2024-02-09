import express from "express";
import { add } from "./Controller";
import { validationMiddleware } from "../../middleware/validationmiddleware";
import { IsDate, IsString, MaxLength } from "class-validator";
const router = express.Router();

export class ChampionDto {
  @IsString()
  @MaxLength(25)
  name: string = "";

  @IsDate()
  date?: Date;
}

router.use(validationMiddleware(ChampionDto));
router.post("/", add);

export default router;
