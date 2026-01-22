import patientData from '../../data/patients';
import type { NonSensitivePatientEntry, Patient } from '../types';

export const getPatients = (): Patient[] => {
  return patientData;
};

export const getNonSensitivePatients = (): NonSensitivePatientEntry[] => {
  return patientData.map(({id, name, dateOfBirth, gender, occupation}) => ({id, name, dateOfBirth, gender, occupation}));
};


