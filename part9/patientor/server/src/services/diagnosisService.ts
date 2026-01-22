import diagnosisData from '../../data/diagnoses';
import type { Diagnosis } from '../types';

const getDiagnoses = (): Diagnosis[] => {
  return diagnosisData;
};


export default {
  getDiagnoses
};
