import {z} from 'zod';
import { NewPatientSchema } from './utils';

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type NonSensitivePatientEntry = Omit<Patient, 'ssn'>;

export type NewPatient = z.infer<typeof NewPatientSchema>;
export interface Patient extends NewPatient {
  id: string;
}

export enum Gender {
  Other = 'other',
  Male = 'male',
  Female = 'female'
}
