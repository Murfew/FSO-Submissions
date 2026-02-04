import { Alert, Box, Button, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { useState } from "react";
import patientService from '../../services/patients';
import { NewEntry, Entry } from "../../types";
import axios from "axios";

interface Props {
  patientId: string;
  onEntryAdded: (patientId: string, entry: Entry) => void;

}

const OccupationalHealthcareEntryForm = ({patientId, onEntryAdded}: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveEnabled, setSickLeaveEnabled] = useState(false);
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();

      const newEntry: NewEntry = {
        type: "OccupationalHealthcare",
        description,
        date,
        specialist,
        employerName,
        ...(sickLeaveEnabled
          ? { sickLeave: 
              { 
                startDate: sickLeaveStartDate, 
                endDate: sickLeaveEndDate 
              } 
            }
          : {}),
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
    setEmployerName('');
    setSickLeaveEnabled(false);
    setSickLeaveStartDate('');
    setSickLeaveEndDate('');
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
          <Typography variant="h6" sx={{fontWeight: "bold"}}>New Occupational Healthcare Entry</Typography>
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
            label="Employer name" 
            value={employerName} 
            onChange={(e) => setEmployerName(e.target.value)}
            required
          />
          <FormControlLabel 
            control={
              <Checkbox 
                checked={sickLeaveEnabled} 
                onChange={(e) => setSickLeaveEnabled(e.target.checked)}
              />} 
            label="Sick leave" 
          />
          {sickLeaveEnabled && (
            <TextField 
              variant="standard" 
              label="Sick leave start date" 
              value={sickLeaveStartDate} 
              onChange={(e) => setSickLeaveStartDate(e.target.value)}
              required
            />
          )}
          {sickLeaveEnabled && (
            <TextField 
              variant="standard" 
              label="Sick leave end date" 
              value={sickLeaveEndDate} 
              onChange={(e) => setSickLeaveEndDate(e.target.value)}
              required
            />
          )}
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

export default OccupationalHealthcareEntryForm;
