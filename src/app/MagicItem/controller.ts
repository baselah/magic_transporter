import { NextFunction, Request, Response } from 'express';
import MagicItem from './model';
import httpStatus from 'http-status';

export const addItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await MagicItem.create(req.body);
    res.status(httpStatus.OK).json({ result: 'Magic Item add successfuly' });
  } catch (error: any) {
    next(error);
  }
};

export const getAllItems = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const items = await MagicItem.find();
    res.status(httpStatus.OK).json({ result: items });
  } catch (error: any) {
    next(error);
  }
};
