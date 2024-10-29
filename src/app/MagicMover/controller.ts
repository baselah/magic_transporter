import { NextFunction, Request, Response } from 'express';
import MagicMover from './model';
import MagicItem from '../MagicItem/model';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { ActivityLogs } from '../ActivityLog/service';

export const addMover = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await MagicMover.create(req.body);
    res.status(httpStatus.OK).json({ result: 'Magic Mover add successfuly' });
  } catch (error: any) {
    next(error);
  }
};

export const getAllMovers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const movers = await MagicMover.find();
    res.status(httpStatus.OK).json({ result: movers });
  } catch (error: any) {
    next(error);
  }
};

export const loadItems = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { mover_id } = req.params;
  const { itemIds } = req.body;
  try {
    const mover = await MagicMover.findById(mover_id).populate('items');
    if (!mover) {
      throw new Error('Mover Not Found');
    }
    if (mover.questState == 'on-mission') {
      throw new Error('Cannot load items while on mission.');
    }
    const itemObjectIds = itemIds.map(
      (id: string) => new mongoose.Types.ObjectId(id),
    );
    const totalWeight = await MagicItem.aggregate([
      { $match: { _id: { $in: itemObjectIds } } },
      { $group: { _id: null, totalWeight: { $sum: '$weight' } } },
    ]);
    const currentWeight = mover.items.reduce(
      (acc, item: any) => acc + item.weight,
      0,
    );

    if (totalWeight[0].totalWeight + currentWeight > mover.weightLimit) {
      throw new Error('Weight limit exceeded.');
    }

    mover.items.push(...itemIds);
    mover.questState = 'loading';
    await mover.save();
    await new ActivityLogs({ moverId: mover.id, state: 'loading' }).create();
    res
      .status(httpStatus.OK)
      .json({ result: 'Items Load To Mover successfuly' });
  } catch (error) {
    next(error);
  }
};

export const startMission = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { mover_id } = req.params;
  try {
    const mover = await MagicMover.findById(mover_id);
    if (!mover) {
      throw new Error('Mover Not Found');
    }
    if (mover.questState !== 'loading') {
      throw new Error('Mover must be in loading state to start mission.');
    }
    mover.questState = 'on-mission';
    await mover.save();
    await new ActivityLogs({ moverId: mover.id, state: 'on-mission' }).create();
    res
      .status(httpStatus.OK)
      .json({ result: 'Mover Start Mission successfuly' });
  } catch (error) {
    next(error);
  }
};

export const endMission = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { mover_id } = req.params;
  try {
    const mover = await MagicMover.findById(mover_id);
    if (!mover) {
      throw new Error('Mover Not Found');
    }
    if (mover.questState !== 'on-mission') {
      throw new Error('Mover must be in on-mission state to end mission.');
    }
    mover.questState = 'resting';
    mover.missionsCompleted += 1;
    mover.items = [];
    await mover.save();
    await new ActivityLogs({ moverId: mover.id, state: 'resting' }).create();
    res.status(httpStatus.OK).json({ result: 'Mover End Mission successfuly' });
  } catch (error) {
    next(error);
  }
};

export const topMovers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const movers = await MagicMover.find().sort({ missionsCompleted: -1 });
    res.status(200).json(movers);
  } catch (error) {
    next(error);
  }
};
