import { Schema, model, Model } from "mongoose";

const hospitalSchema = new Schema<IHospital>({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

export interface IHospital {
  name: string;
  location: string;
}

export const Hospital: Model<IHospital> = model("Hospital", hospitalSchema);
