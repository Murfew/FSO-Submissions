import { Box, Typography } from "@mui/material";
import type { Diagnosis } from "../../types";

interface Props {
  diagnosisCodes?: Array<Diagnosis["code"]>;
  diagnosesInfo: Diagnosis[];
}

const getName = (code: string, diagnosesInfo: Diagnosis[]) =>
  diagnosesInfo.find((d) => d.code === code)?.name ?? 'Unknown diagnosis';

const DiagnosisList = ({ diagnosisCodes, diagnosesInfo }: Props) => {
  if (!diagnosisCodes?.length) return null;

  return (
    <Box component="ul" sx={{ m: 0, pl: 3 }}>
      {diagnosisCodes.map((code) => (
        <li key={code}>
          <Typography variant="body2">
            {code} {getName(code, diagnosesInfo)}
          </Typography>
        </li>
      ))}
    </Box>
  );
};

export default DiagnosisList;
