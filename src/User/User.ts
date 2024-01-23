import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { Document } from "mongoose";
const userSchema = new mongoose.Schema({
  userName: String,
  team: String,
  icon: String,
});

export interface IUser extends Document {
  userName: string;
  team: string;
  icon: string;
  generateAuthToken(): string;
}
userSchema.methods.generateAuthToken = function () {
  const user = this;
  const access = "auth";
  const expiresIn = "1d";
  const token = jwt
    .sign({ _id: user._id.toHexString(), access }, `${process.env.SECRETKEY}`, {
      expiresIn
    })
    .toString();

  return token;
};
export default mongoose.model<IUser>("User", userSchema);
