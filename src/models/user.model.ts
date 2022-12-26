import { Schema, model, Model } from "mongoose";

export interface IUser {
  name: string;
  age?: Number;
  email: string;
  gender: string;
  profession?: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
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
    enum: ["doctor", "patient", "admin"],
    default: "patient",
  },
  password: {
    type: String,
    required: true,
  },
});

export const User: Model<IUser> = model("User", userSchema);
