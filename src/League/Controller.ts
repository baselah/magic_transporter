import { Request, Response } from "express";
import League from "./League";
import httpStatus from "http-status";

export const add = async (req: Request, res: Response) => {
  try {
    const { name , date } = req.body;
    await League.create({
      name : name,
      date: date,
    });

    res.status(httpStatus.OK).json({ result: "league add successfuly" });
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).json({ result: error.message });
  }
};