import { Gender } from "./types";
import {z} from 'zod';

export const EntrySchema = z.object({});

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().pipe(z.iso.date()),
  ssn: z.string(),
  gender: z.enum([Gender.Male, Gender.Female, Gender.Other]),
  occupation: z.string(),
  entries: z.array(EntrySchema)
});



