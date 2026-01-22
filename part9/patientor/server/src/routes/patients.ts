import express from "express";
import type { Response } from "express";
import type { NonSensitivePatientEntry } from "../types";
import { getNonSensitivePatients } from "../services/patientService";

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
  const patients = getNonSensitivePatients();
  res.send(patients);
});

export default router;
