import { ActivityLog } from './model';

/**
 * Represents an activity log entry for a mover's state change.
 */
export class ActivityLogs {
  private moverId: string;
  private state: string;

  /**
   * Initializes a new instance of the ActivityLogs class.
   *
   * @param {Object} parameters - The parameters for creating an activity log.
   * @param {string} parameters.moverId - The unique identifier of the mover.
   * @param {string} parameters.state - The state to log for the mover (e.g., 'on-mission', 'resting').
   */
  constructor(parameters: { moverId: string; state: string }) {
    // Set moverId and state based on provided parameters
    this.moverId = parameters.moverId;
    this.state = parameters.state;
  }

  /**
   * Creates a new activity log document in the database.
   *
   * @returns {Promise<string>} A promise that resolves to a success message if the log is added successfully.
   *
   * @throws {Error} If there is an error during the database operation, it will be thrown for handling by the caller.
   */
  public async create(): Promise<string> {
    // Create a new activity log entry in the database with the current moverId and state
    await ActivityLog.create(this);

    // Return a success message indicating the log was added
    return `Log for ${this.state} Added successfully`;
  }
}
