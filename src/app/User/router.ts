import express from "express";
import { addUser, getAll, login } from "./Controller";
import { validationMiddleware } from "../../middleware/validationmiddleware";
import { IsString, MaxLength } from "class-validator";
const router = express.Router();

export class UserDto {
  @IsString()
  @MaxLength(15)
  userName: string = "";

  @IsString()
  @MaxLength(15)
  team: string = "";

  @IsString()
  @MaxLength(15)
  icon: string = "";
}
router.post("/login", login);
router.get("/", getAll);

router.use(validationMiddleware(UserDto));
router.post("/", addUser);

export default router;
