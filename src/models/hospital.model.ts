import { Schema, model, Model } from "mongoose";

export interface IHospital {
  name: string;
  location: string;
  phone?: number;
  website?: string;
}

const hospitalSchema = new Schema<IHospital>({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
});

export const Hospital: Model<IHospital> = model("Hospital", hospitalSchema);
