import express from "express";
import { addUser } from "./Controller.js";
import { validateUser } from "../middleware/validationUserMiddleware.js";
const router = express.Router();
router.use(validateUser);
router.post("/", addUser);
export default router;
//# sourceMappingURL=router.js.map