import express from 'express';
import type { Response } from 'express';
import type { Diagnosis } from '../types';
import diagnosisService from '../services/diagnosisService';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
  const diagnoses = diagnosisService.getDiagnoses();
  res.send(diagnoses);
});

export default router;
