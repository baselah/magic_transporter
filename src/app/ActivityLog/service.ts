import { ActivityLog } from './model';
export class ActivityLogs {
  private moverId: string;
  private state: string;
  constructor(parameters: { moverId: string; state: string }) {
    this.moverId = parameters.moverId;
    this.state = parameters.state;
  }

  public async create() {
    await ActivityLog.create(this);
    return 'success';
  }
}
