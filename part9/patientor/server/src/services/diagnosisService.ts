import diagnosisData from '../../data/diagnoses';

import type { Diagnosis } from '../types';

const diagnoses: Diagnosis[] = diagnosisData;

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnosis
};
