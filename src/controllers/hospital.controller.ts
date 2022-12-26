import { Request, Response } from "express";
import { Hospital } from "../models/hospital.model";

// Create a new Hospital
export const createHospital = async (req: Request, res: Response) => {
  const { name, location } = req.body;
  if (!name || !location)
    return res.status(400).json({
      status: "error",
      error: "Please provide both name and location",
    });

  try {
    const newHospital = Hospital.create({
      location,
      name,
    });
    return res
      .status(200)
      .json({ status: "ok", error: "Added Hospital successfully" });
  } catch (error) {
    return res
      .status(400)
      .json({ status: "error", error: "Unable to save a new hospital" });
  }
};

// Get all Hospitals
export const getHospitals = async (req: Request, res: Response) => {
  try {
    const examples = await Hospital.find({});
    return res.status(200).json({ status: "ok", examples });
  } catch (error) {
    return res
      .status(400)
      .json({ status: "error", error: "No hospitals found" });
  }
};

//Delete a Hospital
export const deleteHospital = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const hospitalToDelete = await Hospital.findByIdAndRemove(id);
    if (!hospitalToDelete)
      return res
        .status(400)
        .json({ status: "error", error: "Hospital not valid" });
  } catch (error) {
    return res
      .status(400)
      .json({ status: "error", error: "Couldn't remove hospital" });
  }
  const hospitalToDelete = await Hospital.findByIdAndRemove(id);
  return res
    .status(200)
    .json({ status: "ok", error: "Hospital deleted successfully!" });
};

//Update a Hospital Informations
export const updateHospitalDetails = async (req: Request, res: Response) => {
  const id = req.params.id;
  Hospital.findByIdAndUpdate(
    { _id: id },
    { name: req.body.name, location: req.body.location },
    (error) => {
      if (error) {
        return res
          .status(400)
          .json({ status: "error", error: "Hospital not valid" });
      } else {
        return res.status(200).json({
          status: "ok",
          error: "Hospital informations Updated successfully!",
        });
      }
    }
  );
};
