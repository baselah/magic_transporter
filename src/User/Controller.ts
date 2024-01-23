import { Request, Response } from "express";
import User from "./User";
import httpStatus from "http-status";

export const addUser = async (req: Request, res: Response) => {
  try {
    const { userName, team } = req.body;
    await User.create({
      userName: userName,
      team: team,
    });

    res.status(httpStatus.OK).json({ result: "user add successfuly" });
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).json({ result: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({
      userName: userName,
      password: password,
    });

    if (user === null)
      res
        .status(httpStatus.OK)
        .json({ message: "user name or password is invalid" });

    res.status(httpStatus.OK).json({ result: user, token: user });
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).json({ result: error.message });
  }
};
