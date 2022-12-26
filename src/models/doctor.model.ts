import { Schema, model, Model } from "mongoose";

export interface IDoctor {
  specialization: String;
  education: String;
  hospital: Schema.Types.ObjectId;
  info: Schema.Types.ObjectId;
}

const doctorSchema = new Schema<IDoctor>({
  info: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  specialization: {
    type: String,
    required: true,
  },

  education: {
    type: String,
    required: true,
  },
  hospital: {
    type: Schema.Types.ObjectId,
    ref: "Hospital",
  },
});

export const Doctor: Model<IDoctor> = model("Doctor", doctorSchema);
