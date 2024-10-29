import { NextFunction, Request, Response } from 'express';
import MagicItem from './model';
import httpStatus from 'http-status';

/**
 * Adds a new magic item to the database.
 *
 * @param {Request} req - The request object containing item data in the body.
 * @param {Response} res - The response object used to send the success message.
 * @param {NextFunction} next - The next middleware function in the Express.js chain.
 *
 * @returns {Promise<void>} A promise that resolves to void.
 *
 * @throws {Error} If there is an error while creating the item, it will be passed to the next middleware.
 */
export const addItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Create a new MagicItem document in the database with data from the request body
    await MagicItem.create(req.body);

    // Send a response with status 201 (Created) on successful addition
    res
      .status(httpStatus.CREATED)
      .json({ result: 'Magic Item added successfully' });
  } catch (error: any) {
    // Pass any errors to the next middleware for handling
    next(error);
  }
};

/**
 * Retrieves all magic items from the database.
 *
 * @param {Request} req - The request object representing the HTTP request.
 * @param {Response} res - The response object used to send back the list of items.
 * @param {NextFunction} next - The next middleware function in the Express.js chain.
 *
 * @returns {Promise<void>} A promise that resolves to void.
 *
 * @throws {Error} If there is an error while retrieving the items, it will be passed to the next middleware.
 */
export const getAllItems = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Fetch all MagicItem documents from the database
    const items = await MagicItem.find();

    // Send the list of items as a response with status 200 (OK)
    res.status(httpStatus.OK).json({ result: items });
  } catch (error: any) {
    // Pass any errors to the next middleware for handling
    next(error);
  }
};
