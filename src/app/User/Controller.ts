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

export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});

    res.status(httpStatus.OK).json({ result: users });
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).json({ result: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { userName } = req.body;
    const user = await User.findOne({
      userName: userName,
    });

    if (user === null)
      res.status(httpStatus.OK).json({ message: "user name is invalid" });
    else
      res
        .status(httpStatus.OK)
        .json({ result: user.userName, token: user.generateAuthToken() });
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).json({ result: error.message });
  }
};
