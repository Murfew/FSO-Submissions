import patientData from '../../data/patients';
import type { NewPatient, NonSensitivePatientEntry, Patient } from '../types';
import { v4 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patientData;
};

const getNonSensitivePatients = (): NonSensitivePatientEntry[] => {
  return patientData.map(({id, name, dateOfBirth, gender, occupation}) => ({id, name, dateOfBirth, gender, occupation}));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...patient
  };
  patientData.push(newPatient);
  return newPatient;
};

export default {
  getPatients, 
  getNonSensitivePatients,
  addPatient
};

