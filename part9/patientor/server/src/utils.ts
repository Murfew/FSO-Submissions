import {
  Gender,
  NewPatient,
  UnknownObject,
} from "./types";


const isString = (value: unknown): value is string =>
  typeof value === "string" || value instanceof String;

const isObject = (value: unknown): value is UnknownObject =>
  typeof value === "object" && value !== null;

const isDate = (date: string): boolean => Boolean(Date.parse(date));

const isGender = (g: unknown): g is Gender =>
  isString(g) && (Object.values(Gender) as string[]).includes(g);

const parseString = (value: unknown, field: string): string => {
  if (!isString(value)) {
    throw new Error(`Incorrect or missing ${field}`);
  }
  return value;
};

const parseDateString = (value: unknown, field: string): string => {
  const dateStr = parseString(value, field);
  if (!isDate(dateStr)) {
    throw new Error(`Incorrect ${field}: ${dateStr}`);
  }
  return dateStr;
};

const parseGender = (value: unknown): Gender => {
  if (!isGender(value)) {
    throw new Error(`Incorrect or missing gender: ${value}`);
  }
  return value;
};


export const toNewPatient = (value: unknown): NewPatient => {
  if (!isObject(value)) {
    throw new Error("Incorrect or missing patient data");
  }

  return {
    name: parseString(value.name, "name"),
    dateOfBirth: parseDateString(value.dateOfBirth, "dateOfBirth"),
    ssn: parseString(value.ssn, "ssn"),
    gender: parseGender(value.gender),
    occupation: parseString(value.occupation, "occupation"),
  };
};
