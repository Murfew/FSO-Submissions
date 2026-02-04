import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import patientService from '../../services/patients';
import { NewEntry, HealthCheckRating, Entry, Diagnosis } from "../../types";
import axios from "axios";
import { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";

interface Props {
  patientId: string;
  onEntryAdded: (patientId: string, entry: Entry) => void;
  diagnosisInfo: Diagnosis[]
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const HealthCheckEntryForm = ({patientId, onEntryAdded, diagnosisInfo}: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Dayjs | null>(null);
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating | null>(null);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();

      const newEntry: NewEntry = {
        type: "HealthCheck",
        description,
        date: date!.format('YYYY-MM-DD'),
        specialist,
        healthCheckRating: healthCheckRating!,
        diagnosisCodes,
      };

      try {
        const created = await patientService.addEntry(patientId, newEntry);
        onEntryAdded(patientId, created);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error?.response?.data && typeof error?.response?.data === "string") {
            const message = error.response.data.replace('Something went wrong. Error: ', '');
            setError(message);
          } else {
            setError("Unrecognized axios error");
          }
        } else {
          setError("Unknown error");
        }
      } finally {
        resetForm();
      }
  };

  const resetForm = () => {
    setDescription('');
    setDate(null);
    setSpecialist('');
    setHealthCheckRating(null);
    setDiagnosisCodes([]);
  };

  return (
      <>
        {error && <Alert severity="error">{error}</Alert>}
        <Box 
          component="form"
          onSubmit={handleSubmit}
          sx={{borderStyle: "dotted"}} 
          display="flex" 
          flexDirection="column" 
          gap={2}
          p={2}
        >
          <Typography variant="h6" sx={{fontWeight: "bold"}}>New HealthCheck Entry</Typography>
          <TextField 
            variant="outlined" 
            label="Description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <DatePicker 
            label="Date" 
            value={date} 
            onChange={(e) => setDate(e)}
            slotProps={{
              textField: {
                required: true
              }
            }}
          />
          <TextField 
            variant="outlined" 
            label="Specialist" 
            value={specialist} 
            onChange={(e) => setSpecialist(e.target.value)}
            required
          />
          <TextField 
            variant="outlined" 
            type="number"
            label="HealthCheck rating" 
            value={healthCheckRating} 
            onChange={(e) => setHealthCheckRating(Number(e.target.value))}
            required
            inputProps={{
              min: 0,
              max: 3,
              step: 1,
            }}
          />
          <FormControl fullWidth>
            <InputLabel id="diagnosis-codes-label">Diagnosis codes</InputLabel>
            <Select
              labelId="diagnosis-codes-label"
              label="Diagnosis codes"
              multiple
              value={diagnosisCodes}
              onChange={(e) => setDiagnosisCodes(e.target.value as string[])}
              MenuProps={MenuProps}
            >
              {diagnosisInfo.map(code => (
                <MenuItem
                  key={code.code}
                  value={code.code}
                >
                  {code.code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box display="flex" justifyContent="space-between">
            <Button variant="contained" color="error" onClick={resetForm}>Cancel</Button>
            <Button variant="contained" type="submit">Add</Button>
          </Box>
        </Box>
      </>
  );
};

export default HealthCheckEntryForm;
