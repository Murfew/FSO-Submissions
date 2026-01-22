import express from "express";
import type { Response } from "express";
import type { NonSensitivePatientEntry } from "../types";
import patientService from "../services/patientService";
import toNewPatient from "../utils";

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
  const patients = patientService.getNonSensitivePatients();
  res.send(patients);
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);

  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += 'Error ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
