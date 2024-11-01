import mongoose, { Document } from 'mongoose';



//Magic Item Schema
const magicItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  weight: { type: Number, required: true },
});


//Magic Item Interface
export interface IMagicItem extends Document {
  name: string;
  weight: number;
}
export default mongoose.model<IMagicItem>('MagicItem', magicItemSchema);
