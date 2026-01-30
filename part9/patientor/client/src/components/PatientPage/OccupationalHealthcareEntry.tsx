import { Box, Paper, Typography } from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';
import type { Diagnosis, OccupationalHealthcareEntry } from "../../types";
import DiagnosisList from "./DiagnosisList";

interface Props {
  entry: OccupationalHealthcareEntry
  diagnosesInfo: Diagnosis[]
}

const OccupationalHealthcareEntry = ({entry, diagnosesInfo}: Props) => {
  return (
    <Paper variant="outlined" sx={{p: 2}}>
      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <Typography variant="subtitle2">{entry.date}</Typography>
        <WorkIcon />
        <Typography sx={{fontStyle: 'italic'}}>{entry.employerName}</Typography>
      </Box>

      <Typography sx={{fontStyle: 'italic'}}>{entry.description}</Typography>

      {entry.sickLeave && 
        <Typography>sick leave from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</Typography>
      }

      <DiagnosisList diagnosisCodes={entry.diagnosisCodes} diagnosesInfo={diagnosesInfo}/>

      <Typography variant="body2" color="text.secondary" mt={1}>
        diagnosed by {entry.specialist}
      </Typography>
    </Paper>
  );
};

export default OccupationalHealthcareEntry;
