import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Gender, Patient } from "../../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

interface Props {
  patient: Patient | undefined
}

const PatientPage = ({patient} : Props) => {
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
                  <Typography>{code}</Typography>
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
