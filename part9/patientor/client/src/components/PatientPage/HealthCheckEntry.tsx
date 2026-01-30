import { Box, Paper, Typography } from "@mui/material";
import { HealthCheckRating, type Diagnosis, type HealthCheckEntry } from "../../types";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DiagnosisList from "./DiagnosisList";

interface Props {
  entry: HealthCheckEntry
  diagnosesInfo: Diagnosis[]
}

const healthColor = (rating: HealthCheckRating) => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return "primary.main";
    case HealthCheckRating.LowRisk:
      return "success.main";
    case HealthCheckRating.HighRisk:
      return "warning.main";
    case HealthCheckRating.CriticalRisk:
      return "error.main";
    default:
      return "text.secondary";
  }
};

const HealthCheckEntry = ({entry, diagnosesInfo}: Props) => {
    return (
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <Typography variant="subtitle2">{entry.date}</Typography>
          <MedicalServicesIcon />
        </Box>

        <Typography sx={{ fontStyle: "italic" }}>{entry.description}</Typography>

        <Box mt={1}>
          <FavoriteIcon sx={{ color: healthColor(entry.healthCheckRating) }} />
        </Box>

        <DiagnosisList diagnosisCodes={entry.diagnosisCodes} diagnosesInfo={diagnosesInfo} />

        <Typography variant="body2" color="text.secondary" mt={1}>
          diagnosed by {entry.specialist}
        </Typography>
      </Paper>
  );
};

export default HealthCheckEntry;
