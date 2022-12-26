import express from "express";
const router = express.Router();

import {
  createHospital,
  deleteHospital,
  updateHospitalDetails,
  getHospitals,
} from "../controllers/hospital.controller";
import { isAdmin, auth } from "../middlewares/roleChecker";

router.post("/", auth, isAdmin, createHospital);
router.get("/get-hospitals", getHospitals);
router.delete("/delete/:id", auth, isAdmin, deleteHospital);
router.put("/update/:id", auth, isAdmin, updateHospitalDetails);

export default router;
