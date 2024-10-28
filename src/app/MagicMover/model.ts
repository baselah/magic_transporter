import mongoose, { Document } from "mongoose";

const magicMoverSchema = new mongoose.Schema({
  weightLimit: { type: Number, required: true },
  questState: { type: String, enum: ['resting', 'loading', 'on-mission'], default: 'resting' },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MagicItem' }],
  missionsCompleted: { type: Number, default: 0 },
});

export interface IMagicMover extends Document {
    weightLimit: Number,
    questState : String,
    items : [],
    missionsCompleted: Number,
}


export default mongoose.model<IMagicMover>("MagicMover", magicMoverSchema);
