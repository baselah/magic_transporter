import mongoose from 'mongoose';
import MagicItem from './model';

/**
 * Represents a magic item with specific properties such as name and weight.
 */
export class MagicItemClass {
  private name: string;
  private weight: number;

  /**
   * Initializes a new instance of the MagicItemClass.
   *
   * @param {Object} parameters - The parameters for creating a MagicItem instance.
   * @param {string} parameters.name - The name of the magic item.
   * @param {number} parameters.weight - The weight of the magic item.
   */
  constructor(parameters: { name: string; weight: number }) {
    // Set the name and weight properties from the provided parameters
    this.name = parameters.name;
    this.weight = parameters.weight;
  }

  /**
   * Creates a new magic item document in the database.
   *
   * @returns {Promise<string>} A promise that resolves to a success message if creation is successful.
   *
   * @throws {Error} If an error occurs during database creation, it will be thrown.
   */
  public async create(): Promise<string> {
    // Create a new document in the MagicItem collection using the current instance properties
    await MagicItem.create(this);

    // Return a success message upon successful creation
    return 'success';
  }

  /**
   * Counts the total weight of items based on the provided item IDs and returns the items.
   *
   * @param {string[]} itemIds - An array of item IDs.
   * @returns {Promise<{ totalWeight: number; items: any[] }>} An object containing the total weight and the fetched items.
   */
  public static async countItemsWeight(
    itemIds: string[],
  ): Promise<{ totalWeight: number; items: any[] }> {
    // Convert string IDs to MongoDB ObjectIds
    const itemObjectIds = itemIds.map(
      (id: string) => new mongoose.Types.ObjectId(id),
    );

    // Fetch items directly from the database
    const items = await MagicItem.find({ _id: { $in: itemObjectIds } });

    // Calculate the total weight by summing the weights of the fetched items
    const totalWeight = items.reduce((acc, item) => acc + item.weight, 0);

    return { totalWeight, items }; // Return both total weight and items
  }
}
