import express from "express";
import type { Request, Response } from "express";
import type { Entry, NewEntry, NewPatient, NonSensitivePatient, Patient } from "../types";
import patientService from "../services/patientService";
import { toNewEntry, toNewPatient } from "../utils";

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  const patients = patientService.getNonSensitivePatients();
  res.send(patients);
});

router.get('/:id', (req: Request<{id: string}>, res: Response<Patient>) => {
  console.log("GET /patients/:id param =", req.params.id);
  console.log("Known ids =", patientService.getPatients().map(p => p.id));
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
    let errorMessage = 'Something went wrong. ';
    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req: Request<{id: string}, unknown, NewEntry>, res: Response<Entry | string>) => {
  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(req.params.id,newEntry);
    res.json(addedEntry); 
  } catch (error) {
    let errorMessage = 'Something went wrong. ';
    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});


export default router;
