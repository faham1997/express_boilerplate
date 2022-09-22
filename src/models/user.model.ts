import { Schema, model, Model } from "mongoose";

export interface IUser {
  name: String;
  age: Number;
  email: String;
  gender: String;
  profession: String;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
    default: "male",
  },
  profession: {
    type: String,
    required: true,
  },
});

export const User: Model<IUser> = model("User", userSchema);
