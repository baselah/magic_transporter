import * as dotenv from "dotenv";
import express from "express";
import bodyParser from 'body-parser';
import './config/database';
import router from "./src/User/router";
const app = express();
dotenv.config();
app.use(bodyParser.json());

app.use("/league/api/user", router);
app.listen(process.env.PORT, function () {
  console.log(`Server is listening on localhost:${process.env.PORT}`);
});
