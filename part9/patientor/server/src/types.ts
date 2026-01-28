import {z} from 'zod';
import { EntrySchema, NewPatientSchema } from './utils';

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = z.infer<typeof NewPatientSchema>;
export interface Patient extends NewPatient {
  id: string;
}

export type Entry = z.infer<typeof EntrySchema>;

export enum Gender {
  Other = 'other',
  Male = 'male',
  Female = 'female'
}
