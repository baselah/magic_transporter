import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ActivityLogs } from '../ActivityLog/service';
import MagicMoverClass from './service';
import { MagicItemClass } from '../MagicItem/service';

/**
 * Adds a new Magic Mover.
 *
 * @async
 * @function addMover
 * @param {Request} req - The request object containing the body with Magic Mover data.
 * @param {Response} res - The response object to send the response back to the client.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} - Returns a promise that resolves to void.
 * @throws {Error} - Throws an error if the creation fails.
 */
export const addMover = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await new MagicMoverClass(req.body).create();
    res
      .status(httpStatus.CREATED)
      .json({ result: 'Magic Mover added successfully' });
  } catch (error: any) {
    next(error);
  }
};

/**
 * Retrieves all movers from the MagicMoverClass and sends them in the response.
 *
 * @param {Request} req - The request object representing the HTTP request.
 * @param {Response} res - The response object used to send back the desired HTTP response.
 * @param {NextFunction} next - The next middleware function in the Express.js middleware chain.
 *
 * @returns {Promise<void>} A promise that resolves to void.
 *
 * @throws {Error} If there is an error while retrieving the movers, it will be passed to the next middleware.
 */
export const getAllMovers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const movers = await MagicMoverClass.getAll();
    res.status(httpStatus.OK).json({ result: movers });
  } catch (error: any) {
    next(error);
  }
};

/**
 * Loads items into a mover if the mover is not on a mission and weight limits allow.
 *
 * @param {Request} req - Express request object, containing mover_id in params and itemIds in the body.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function for error handling.
 * @returns {Promise<void>} Sends a JSON response indicating success or passes error to the next middleware.
 */
export const loadItems = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { mover_id } = req.params;
  const { itemIds } = req.body;

  try {
    // Retrieve mover details using the given mover_id
    const mover = await MagicMoverClass.getById(mover_id);

    // Check if mover is currently on a mission
    if (mover.questState === 'on-mission') {
      throw new Error('Cannot load items while on mission.');
    }

    // Calculate the total weight of items to be loaded
    const { totalWeight, items } =
      await MagicItemClass.countItemsWeight(itemIds);

    const existingItemIds = items.map((item) => item._id.toString());

    //Check if all provided items ids is exist
    if (existingItemIds.length !== itemIds.length) {
      throw new Error('Some item IDs do not exist');
    }
    console.log('total Items Weight', totalWeight);

    // Calculate the current weight of items the mover already has
    const currentWeight = mover.items.reduce(
      (acc, item: any) => acc + item.weight,
      0,
    );
    console.log('current Weight', currentWeight);

    // Check if adding the new items exceeds the mover's weight limit
    if (totalWeight + currentWeight > mover.weightLimit) {
      throw new Error('Weight limit exceeded.');
    }

    // Update the mover's quest state to 'loading' and add the new items  and log the loading activity
    const [updatedMover, logs] = await Promise.all([
      MagicMoverClass.update(mover, {
        questState: 'loading',
        items: itemIds,
      }),
      new ActivityLogs({ moverId: mover.id, state: 'loading' }).create(),
    ]);

    console.log(updatedMover);
    console.log(logs);
    // Send success response
    res
      .status(httpStatus.OK)
      .json({ result: 'Items loaded to mover successfully' });
  } catch (error) {
    // Pass any errors to the next middleware
    next(error);
  }
};

/**
 * Starts a mission for the specified mover if the mover is in the loading state.
 *
 * @param {Request} req - The request object representing the HTTP request, containing the mover ID in the parameters.
 * @param {Response} res - The response object used to send back the desired HTTP response.
 * @param {NextFunction} next - The next middleware function in the Express.js middleware chain.
 *
 * @returns {Promise<void>} A promise that resolves to void.
 *
 * @throws {Error} If the mover is not in the loading state or if an error occurs during the process,
 *                 it will be passed to the next middleware.
 */
export const startMission = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Extract the mover_id from the request parameters
  const { mover_id } = req.params;

  try {
    // Retrieve the mover details using the provided mover_id
    const mover = await MagicMoverClass.getById(mover_id);

    // Check if the mover's questState is 'loading'
    if (mover.questState !== 'loading') {
      // If not, throw an error indicating that the mission cannot be started
      throw new Error('Mover must be in loading state to start mission.');
    }

    // Update the mover's state and log the activity concurrently
    const [updatedMover, logs] = await Promise.all([
      // Update the mover's quest state to 'on-mission'
      MagicMoverClass.update(mover, {
        questState: 'on-mission',
      }),
      // Create a new activity log for the mover's state change
      new ActivityLogs({ moverId: mover.id, state: 'on-mission' }).create(),
    ]);

    // Log the updated mover and logs for debugging purposes
    console.log(updatedMover);
    console.log(logs);

    // Send a success response back to the client
    res
      .status(httpStatus.OK)
      .json({ result: 'Mover Start Mission successfully' });
  } catch (error) {
    // Pass any errors to the next middleware for handling
    next(error);
  }
};

/**
 * Ends a mission for the specified mover if the mover is currently on a mission.
 *
 * @param {Request} req - The request object representing the HTTP request, containing the mover ID in the parameters.
 * @param {Response} res - The response object used to send back the desired HTTP response.
 * @param {NextFunction} next - The next middleware function in the Express.js middleware chain.
 * 
 * @returns {Promise<void>} A promise that resolves to void.
 * 
 * @throws {Error} If the mover is not in the on-mission state or if an error occurs during the process, 
 *                 it will be passed to the next middleware.
 */
export const endMission = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Extract the mover_id from the request parameters
  const { mover_id } = req.params;

  try {
    // Retrieve the mover details using the provided mover_id
    const mover = await MagicMoverClass.getById(mover_id);

    // Check if the mover's questState is 'on-mission'
    if (mover.questState !== 'on-mission') {
      // If not, throw an error indicating that the mission cannot be ended
      throw new Error('Mover must be in on-mission state to end mission.');
    }

    // Update the mover's state and log the activity concurrently
    const [updatedMover, logs] = await Promise.all([
      // Update the mover's quest state to 'resting'
      MagicMoverClass.update(mover, {
        questState: 'resting',
      }),
      // Create a new activity log for the mover's state change
      new ActivityLogs({ moverId: mover.id, state: 'resting' }).create(),
    ]);

    // Log the updated mover and logs for debugging purposes
    console.log(updatedMover);
    console.log(logs);

    // Send a success response back to the client
    res.status(httpStatus.OK).json({ result: 'Mover End Mission successfully' });
  } catch (error) {
    // Pass any errors to the next middleware for handling
    next(error);
  }
};


/**
 * Retrieves the top movers and sends them in the response.
 *
 * @param {Request} req - The request object representing the HTTP request.
 * @param {Response} res - The response object used to send back the desired HTTP response.
 * @param {NextFunction} next - The next middleware function in the Express.js middleware chain.
 * 
 * @returns {Promise<void>} A promise that resolves to void.
 * 
 * @throws {Error} If an error occurs while retrieving the top movers, 
 *                 it will be passed to the next middleware.
 */
export const topMovers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Retrieve the top movers from the MagicMoverClass
    const movers = await MagicMoverClass.getTop();

    // Send the movers as a response with a 200 OK status
    res.status(httpStatus.OK).json({ result: movers });
  } catch (error) {
    // Pass any errors to the next middleware for handling
    next(error);
  }
};

