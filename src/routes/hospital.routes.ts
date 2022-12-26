import express from "express";
const router = express.Router();

import {
  createHospital,
  deleteHospital,
  updateHospitalDetails,
  getHospitals,
} from "../controllers/hospital.controller";

router.post("/", createHospital);
router.get("/get-hospitals", getHospitals);
router.delete("/delete/:id", deleteHospital);
router.put("/update/:id", updateHospitalDetails);

export default router;
