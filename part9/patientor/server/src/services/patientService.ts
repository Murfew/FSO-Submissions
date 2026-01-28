import patientData from '../../data/patients';
import type { NewPatient, NonSensitivePatient, Patient } from '../types';
import { v4 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patientData;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
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

const findById = (id: string): Patient | undefined => {
  const entry = patientData.find(p => p.id === id);
  return entry;
};

export default {
  getPatients, 
  getNonSensitivePatients,
  addPatient,
  findById
};

