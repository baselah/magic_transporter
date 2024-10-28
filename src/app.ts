import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from 'body-parser';
import '../config/database';
import router from "./app/router";
import { ErrorHandler } from "./middleware/errorsHandler";
const app = express();
app.use(bodyParser.json());

app.use("/magic/api/v0", router);


app.use(ErrorHandler)
app.listen(process.env.PORT, function () {
  console.log(`Server is listening on localhost:${process.env.PORT}`);
});
