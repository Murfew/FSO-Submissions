import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import patientService from '../../services/patients';
import { NewEntry, HealthCheckRating, Entry } from "../../types";
import axios from "axios";

interface Props {
  patientId: string;
  onEntryAdded: (patientId: string, entry: Entry) => void;

}

const HealthCheckEntryForm = ({patientId, onEntryAdded}: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();

      const newEntry: NewEntry = {
        type: "HealthCheck",
        description,
        date,
        specialist,
        healthCheckRating: Number(healthCheckRating) as HealthCheckRating,
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
    setDate('');
    setSpecialist('');
    setHealthCheckRating('');
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
          <Typography variant="h6" sx={{fontWeight: "bold"}}>New HealthCheck entry</Typography>
          <TextField 
            variant="standard" 
            label="Description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <TextField 
            variant="standard" 
            label="Date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <TextField 
            variant="standard" 
            label="Specialist" 
            value={specialist} 
            onChange={(e) => setSpecialist(e.target.value)}
            required
          />
          <TextField 
            variant="standard" 
            label="HealthCheck rating" 
            value={healthCheckRating} 
            onChange={(e) => setHealthCheckRating(e.target.value)}
            required
          />
          <TextField 
            variant="standard" 
            label="Diagnosis codes" 
            value={diagnosisCodes} 
            onChange={(e) => setDiagnosisCodes(e.target.value.split(',').map(code => code.trim()))}
            required
          />

          <Box display="flex" justifyContent="space-between">
            <Button variant="contained" color="error" onClick={resetForm}>Cancel</Button>
            <Button variant="contained" type="submit">Add</Button>
          </Box>
        </Box>
      </>
  );
};

export default HealthCheckEntryForm;
