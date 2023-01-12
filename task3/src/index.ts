import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import UserRouter from "./route/user.route";

dotenv.config();
if (process.env.MONGO_URI === undefined) {
  throw Error("Mongo URI is not defined");
}

mongoose.connect(process.env.MONGO_URI);

const app = express();

app.use(express.json());

app.use("/users", UserRouter);

app.listen(3000);
