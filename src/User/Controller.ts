import { Request, Response } from "express";
import User from "./User";
import httpStatus from "http-status";

export const addUser = async (req: Request, res: Response) => {
  try {
    const { name, userName, password } = req.body;
    const result = await User.create({
      name: name,
      userName: userName,
      password: password,
    });

    res.status(httpStatus.OK).json({ result: result });
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).json({ result: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body;
    const result = await User.findOne({
      userName: userName,
      password: password,
    });

    if (result === null)
      res
        .status(httpStatus.OK)
        .json({ message: "user name or password is invalid" });

    res.status(httpStatus.OK).json({ result: result });
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).json({ result: error.message });
  }
};
