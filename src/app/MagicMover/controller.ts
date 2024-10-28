import { Request, Response } from "express";
import MagicMover from "./model";
import httpStatus from "http-status";

export const addMover = async (req: Request, res: Response) => {
  try {
    const mover = await MagicMover.create(req.body);

    res.status(httpStatus.OK).json({ result: "Magic Mover add successfuly" });
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).json({ result: error.message });
  }
};