import mongoose from "mongoose";
import { Document } from "mongoose";
const leagueSchema = new mongoose.Schema({
  name: String,
  date: Date,
});

export interface ILeague extends Document {
    name: String,
    date: Date,
}


export default mongoose.model<ILeague>("Champion", leagueSchema);
