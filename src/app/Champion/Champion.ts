import mongoose from "mongoose";
import { Document } from "mongoose";
const championSchema = new mongoose.Schema({
  name: String,
  date: Date,
});

export interface IChampion extends Document {
    name: String,
    date: Date,
}


export default mongoose.model<IChampion>("Champion", championSchema);
