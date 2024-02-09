import { Request, Response } from "express";
import Champion from "./Champion";
import httpStatus from "http-status";

export const add = async (req: Request, res: Response) => {
  try {
    const { name , date } = req.body;
    await Champion.create({
      name : name,
      date: date,
    });

    res.status(httpStatus.OK).json({ result: "Champion add successfuly" });
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).json({ result: error.message });
  }
};