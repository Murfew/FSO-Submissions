import { NewPatient } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect name' + name);
  }

  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect date of birth' + dateOfBirth);
  }

  return dateOfBirth;
};

const parseSSN = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Incorrect SSN' + ssn);
  }

  return ssn;
};

const parseGender = (gender: unknown): string => {
  if (!isString(gender)) {
    throw new Error('Incorrect gender' + gender);
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect occupation' + occupation);
  }

  return occupation;
};

const toNewPatient = (object: unknown) => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation)
    };

    return newPatient;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatient;
