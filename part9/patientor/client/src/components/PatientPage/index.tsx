import { Box, Typography } from "@mui/material";
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
      <Typography variant="h4" style={{fontWeight: "bold"}}>{patient.name} {patient.gender === Gender.Female ? <FemaleIcon fontSize="large" /> : <MaleIcon fontSize="large"/>}</Typography>
      <Box>
        {patient.ssn && <Typography>ssn: {patient.ssn}</Typography>}
        <Typography>occupation: {patient.occupation}</Typography>
        {patient.dateOfBirth && <Typography>date of birth: {patient.dateOfBirth}</Typography>}
      </Box>
    </Box>
  );
};

export default PatientPage;
