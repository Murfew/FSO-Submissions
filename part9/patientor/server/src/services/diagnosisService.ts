import diagnosisData from '../../data/diagnoses';
import type { Diagnosis } from '../types';

export const getDiagnoses = (): Diagnosis[] => {
  return diagnosisData;
};


