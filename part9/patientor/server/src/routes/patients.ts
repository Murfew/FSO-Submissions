import express from "express";
import type { Request, Response } from "express";
import type { NewPatient, NonSensitivePatient, Patient } from "../types";
import patientService from "../services/patientService";
import { toNewPatient } from "../utils";

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  const patients = patientService.getNonSensitivePatients();
  res.send(patients);
});

router.get('/:id', (req: Request<{id: string}>, res: Response<Patient>) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req: Request<unknown, unknown, NewPatient>, res: Response<Patient | string>) => {
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
