import mongoose, { model, Schema } from "mongoose";
import modelNames from "../const/modelNames";

const UserSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
});

const userModel = model(modelNames.USER, UserSchema);
export default userModel;
