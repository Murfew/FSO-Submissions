import { Box, Typography } from "@mui/material";
import { Diagnosis, Gender, Patient } from "../../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { useEffect, useState } from "react";
import diagnosesService from '../../services/diagnoses';

interface Props {
  patient: Patient | undefined
}

const PatientPage = ({patient} : Props) => {
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
      <Typography variant="h6" sx={{fontWeight: 'bold'}}>entries</Typography>
      {patient.entries.map((entry) => (
        <Box key={entry.id} sx={{}}>
          <Typography>{entry.date}</Typography>
          { }
          <Typography sx={{fontStyle: 'italic'}}>{entry.description}</Typography>  
          {entry.diagnosisCodes && 
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>
                  <Typography>{code} {diagnoses.filter((diagnosis) => diagnosis.code === code)[0].name}</Typography>
                </li>
              ))}
            </ul>
          }
        </Box>
      ))}
    </Box>
  );
};

export default PatientPage;
