import { Box, Typography } from "@mui/material";
import { Diagnosis, Entry, Gender, Patient } from "../../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { useEffect, useState } from "react";
import diagnosesService from '../../services/diagnoses';
import EntryDetails from "./EntryDetails";
import HealthCheckEntryForm from "./HealthCheckEntryForm";

interface Props {
  patient: Patient | undefined
  onEntryAdded: (patientId: string, entry: Entry) => void;

}

const PatientPage = ({patient, onEntryAdded} : Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

   useEffect(() => {
    const fetchDiagnosisList = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnosisList();
  }, []);

  if (!patient) {
    return (
      <Box>
        <Typography variant="h6" color="error">Invalid patient id</Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h4" sx={{fontWeight: "bold"}}>{patient.name} {patient.gender === Gender.Female ? <FemaleIcon fontSize="large" /> : <MaleIcon fontSize="large"/>}</Typography>
      <Box>
        {patient.ssn && <Typography>ssn: {patient.ssn}</Typography>}
        <Typography>occupation: {patient.occupation}</Typography>
        {patient.dateOfBirth && <Typography>date of birth: {patient.dateOfBirth}</Typography>}
      </Box>
      <HealthCheckEntryForm patientId={patient.id} onEntryAdded={onEntryAdded}/>
      <Typography variant="h6" sx={{fontWeight: 'bold'}}>entries</Typography>
      {patient.entries.map((entry) => (
        <EntryDetails entry={entry} diagnosesInfo={diagnoses}/>
      ))}
    </Box>
  );
};

export default PatientPage;
