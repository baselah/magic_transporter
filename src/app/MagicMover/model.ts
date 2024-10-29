import mongoose, { Document, Types } from 'mongoose';

const magicMoverSchema = new mongoose.Schema({
  weightLimit: { type: Number, required: true },
  questState: {
    type: String,
    enum: ['resting', 'loading', 'on-mission'],
    default: 'resting',
  },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MagicItem' }],
  missionsCompleted: { type: Number, default: 0 },
});

export interface IMagicMover extends Document {
  weightLimit: number;
  questState: string;
  items: Types.ObjectId[];
  missionsCompleted: number;
}

export default mongoose.model<IMagicMover>('MagicMover', magicMoverSchema);
