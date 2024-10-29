import mongoose from 'mongoose';
import MagicMover, { IMagicMover } from './model';

/**
 * A class representing a MagicMover, including functionality for creating,
 * retrieving, and updating mover instances.
 */
export default class MagicMoverClass {
  private questState: string;
  private weightLimit: number;
  private items: string[];
  private missionsCompleted: number;

  /**
   * Constructs a new instance of MagicMoverClass with the specified parameters.
   *
   * @param {Object} parameters - The parameters for initializing a MagicMover instance.
   * @param {string} parameters.questState - The quest state of the mover.
   * @param {string[]} [parameters.items=[]] - An optional array of items associated with the mover.
   * @param {number} [parameters.weightLimit=0] - The weight limit for the mover.
   * @param {number} [parameters.missionsCompleted=0] - The number of missions the mover has completed.
   */
  constructor(parameters: {
    questState: string;
    items?: string[];
    weightLimit?: number;
    missionsCompleted?: number;
  }) {
    this.weightLimit = parameters.weightLimit ?? 0;
    this.questState = parameters.questState;
    this.items = parameters.items ?? [];
    this.missionsCompleted = parameters.missionsCompleted ?? 0;
  }

  /**
   * Creates a new mover document in the database.
   *
   * @returns {Promise<string>} A promise that resolves to a success message upon creation.
   */
  public async create(): Promise<string> {
    await MagicMover.create(this);
    return 'success';
  }

  /**
   * Retrieves all mover documents from the database.
   *
   * @returns {Promise<IMagicMover[]>} A promise that resolves to an array of all movers.
   */
  public static async getAll(): Promise<IMagicMover[]> {
    const movers = await MagicMover.find();
    return movers;
  }

  /**
   * Retrieves a specific mover by its ID.
   *
   * @param {string} mover_id - The ID of the mover to retrieve.
   * @returns {Promise<IMagicMover>} A promise that resolves to the mover with the specified ID.
   * @throws {Error} If the mover with the specified ID is not found.
   */
  public static async getById(mover_id: string): Promise<IMagicMover> {
    // Fetch the mover by ID and populate associated items
    const mover = await MagicMover.findById(mover_id).populate('items');

    if (!mover) {
      // Throw an error if no mover is found with the given ID
      throw new Error('Mover Not Found');
    }

    return mover;
  }

  /**
   * Updates the mover's state and optional items.
   *
   * @param {IMagicMover} mover - The mover document to update.
   * @param {Object} updatedData - The data to update in the mover.
   * @param {string} updatedData.questState - The new quest state of the mover.
   * @param {any[]} [updatedData.items] - Optional array of items to add to the mover's items.
   * @returns {Promise<string>} A promise that resolves to a success message after the update.
   */
  public static async update(
    mover: IMagicMover,
    updatedData: { questState: string; items?: any[] },
  ): Promise<string> {
    // Check if questState is 'resting'; if so, reset items and increment completed missions
    if (updatedData.questState === 'resting') {
      mover.missionsCompleted += 1;
      mover.items = [];
    } else if (updatedData.items) {
      // Append any new items if provided
      mover.items.push(...updatedData.items);
    }

    // Set the mover's questState to the new state
    mover.questState = updatedData.questState;

    // Save the updated mover to the database
    await mover.save();

    return `update mover state to ${updatedData.questState} success`;
  }

  /**
   * Retrieves the top movers sorted by the number of missions completed in descending order.
   *
   * @returns {Promise<IMagicMover[]>} A promise that resolves to an array of the top movers.
   */
  public static async getTop(): Promise<IMagicMover[]> {
    // Find movers and sort them by missionsCompleted in descending order
    const movers = await MagicMover.find().sort({ missionsCompleted: -1 });
    return movers;
  }
}
