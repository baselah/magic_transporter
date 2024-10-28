import express from "express";
import MoverRouter from "./MagicMover/router";
const router = express.Router();



router.use("/mover",MoverRouter );

export default router;
