import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
  userName: String,
  team: String,
  icon: String,
});

userSchema.methods.generateAuthToken = function () {
  const user = this;
  const access = "auth";
  const token = jwt
    .sign({ _id: user._id.toHexString(), access }, `${process.env.SECRETKEY}`)
    .toString();

  return token;
};
export default mongoose.model("User", userSchema);
