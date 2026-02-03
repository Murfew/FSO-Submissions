import {
  Diagnosis,
  Gender,
  HealthCheckRating,
  NewEntry,
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

const isHealthCheckRating = (v: unknown): v is HealthCheckRating =>
  typeof v === "number" && Object.values(HealthCheckRating).includes(v);

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

const parseDiagnosisCodes = (
  value: unknown
): Array<Diagnosis["code"]> | undefined => {
  if (value === undefined) return undefined;
  if (!Array.isArray(value) || !value.every(isString)) {
    throw new Error("Incorrect diagnosisCodes");
  }
  return value;
};

const parseHealthCheckRating = (value: unknown): HealthCheckRating => {
  if (!isHealthCheckRating(value)) throw new Error("Incorrect healthCheckRating");
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

export const toNewEntry = (value: unknown): NewEntry => {
  if (!isObject(value)) {
    throw new Error("Incorrect or missing entry data");
  }

  const base = {
    description: parseString(value.description, "description"),
    date: parseDateString(value.date, "date"),
    specialist: parseString(value.specialist, "specialist"),
    diagnosisCodes: parseDiagnosisCodes(value.diagnosisCodes),
  };

  const type = parseString(value.type, "type");

  switch (type) {
    case "Hospital": {
      if (!isObject(value.discharge)) {
        throw new Error("Incorrect or missing discharge");
      }
      return {
        type: "Hospital",
        ...base,
        discharge: {
          date: parseDateString(value.discharge.date, "discharge.date"),
          criteria: parseString(value.discharge.criteria, "discharge.criteria"),
        },
      };
    }

    case "OccupationalHealthcare": {
      const entry: NewEntry = {
        type: "OccupationalHealthcare",
        ...base,
        employerName: parseString(value.employerName, "employerName"),
      };

      if (value.sickLeave !== undefined) {
        if (!isObject(value.sickLeave)) {
          throw new Error("Incorrect sickLeave");
        }
        entry.sickLeave = {
          startDate: parseDateString(value.sickLeave.startDate, "sickLeave.startDate"),
          endDate: parseDateString(value.sickLeave.endDate, "sickLeave.endDate"),
        };
      }

      return entry;
    }

    case "HealthCheck":
      return {
        type: "HealthCheck",
        ...base,
        healthCheckRating: parseHealthCheckRating(value.healthCheckRating),
      };

    default:
      throw new Error(`Unknown entry type: ${type}`);
  }
};


