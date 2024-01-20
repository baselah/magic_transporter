import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://root:root@cluster0.ank1pxn.mongodb.net/?retryWrites=true&w=majority",
  {}
);

const db = mongoose.connection;

console.log('sadddddd');

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

