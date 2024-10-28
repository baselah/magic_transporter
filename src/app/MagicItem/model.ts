import mongoose, { Document } from "mongoose";

const magicItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    weight: { type: Number, required: true },
});

export interface IMagicItem extends Document {
    name: String,
    weight: Number,
}
module.exports = mongoose.model<IMagicItem>('MagicItem', magicItemSchema);