import patientData from '../../data/patients';
import type { Entry, NewEntry, NewPatient, NonSensitivePatient, Patient } from '../types';
import { v4 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patientData;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientData.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({id, name, dateOfBirth, gender, occupation, entries}));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...patient,
    entries: []
  };
  patientData.push(newPatient);
  return newPatient;
};

const findById = (id: string): Patient | undefined => {
  const entry = patientData.find(p => p.id === id);
  return entry;
};

const addEntry = (patientId: string, entry: NewEntry): Entry => {
  const newEntry: Entry = {
    id: uuid(),
    ...entry
  };

  const patient = findById(patientId);
  patient?.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients, 
  getNonSensitivePatients,
  addPatient,
  findById,
  addEntry
};

