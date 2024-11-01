import mongoose, { Document, Schema } from 'mongoose';


//Activity Log Interface
interface IActivityLog extends Document {
  moverId: mongoose.Types.ObjectId;
  state: 'loading' | 'on-mission' | 'resting';
  timestamp: Date;
}

//Activity Log Schema
const ActivityLogSchema = new Schema<IActivityLog>({
  moverId: { type: Schema.Types.ObjectId, ref: 'MagicMover', required: true },
  state: {
    type: String,
    enum: ['loading', 'on-mission', 'resting'],
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});

export const ActivityLog = mongoose.model<IActivityLog>(
  'ActivityLog',
  ActivityLogSchema,
);
