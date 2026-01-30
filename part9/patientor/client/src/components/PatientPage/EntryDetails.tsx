import { Diagnosis, Entry } from "../../types";
import { assertNever } from "../../utils";
import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HostpitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";

interface Props {
  entry: Entry
  diagnosesInfo: Diagnosis[]
}

const EntryDetails = ({ entry, diagnosesInfo }: Props) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} diagnosesInfo={diagnosesInfo}/>; 
    case 'Hospital':
      return <HospitalEntry entry={entry} diagnosesInfo={diagnosesInfo}/>;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntry entry={entry} diagnosesInfo={diagnosesInfo}/>;
    default:
      assertNever(entry);
  }
};

export default EntryDetails;
