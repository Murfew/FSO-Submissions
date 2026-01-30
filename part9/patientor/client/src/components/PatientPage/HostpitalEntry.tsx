import { Box, Paper, Typography } from "@mui/material";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import type { Diagnosis, HospitalEntry } from "../../types";
import DiagnosisList from "./DiagnosisList";

interface Props {
  entry: HospitalEntry
  diagnosesInfo: Diagnosis[]
}

const HospitalEntry = ({entry, diagnosesInfo}: Props) => {
  return (
    <Paper variant="outlined" sx={{p: 2}}>
      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <Typography variant="subtitle2">{entry.date}</Typography>
        <LocalHospitalIcon />
      </Box>

      <Typography sx={{ fontStyle: "italic" }}>{entry.description}</Typography>

      <Box display="flex" justifyContent="center" flexDirection="column" mt={1} mb={1}>
        <Typography>discharge date: {entry.discharge.date}</Typography>
        <Typography>discharge criteria: {entry.discharge.criteria}</Typography>
      </Box>

      <DiagnosisList diagnosisCodes={entry.diagnosisCodes} diagnosesInfo={diagnosesInfo} />

      <Typography variant="body2" color="text.secondary" mt={1}>
          diagnosed by {entry.specialist}
        </Typography>
    </Paper>
  );
};

export default HospitalEntry;
