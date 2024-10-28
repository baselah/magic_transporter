import mongoose from "mongoose";

const mongoUrl: string = process.env.MONGOURL || '';


mongoose.connect(
  mongoUrl,
  {}
);

const db = mongoose.connection;


db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

