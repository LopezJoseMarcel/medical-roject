import React, { useState, useEffect } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import '../styles/PatientList.css';

const PatientList = (props) => {
  const [checked, setChecked] = useState([]);
  const [citas, setCitas] = useState(props.citas);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    setCitas(props.citas);
  }, [props.citas]);

  const handleChange = (e) => {
    const citaId = e.target.value;
    const selectedCita = citas.find((cita) => cita._id === citaId);

    setSelectedUser({
      usuario_id: selectedCita.usuario_id,
      full_name: selectedCita.full_name,
      cita_id: selectedCita._id,
    });
  };

  const handleSend = () => {
    if (selectedUser) {
      props.changeView('medicalConsultation', selectedUser);
    }
  };

  return (
    <div id='checkbox-container'>
      <FormGroup>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            Selecciona un paciente:
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
          >
            {citas.map((cita) => (
              <FormControlLabel
                key={cita._id}
                control={
                  <Radio
                    value={cita._id}
                    onChange={handleChange}
                    checked={selectedUser && selectedUser.cita_id === cita._id}
                  />
                }
                label={cita.full_name + " - " + cita.turno}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <Button variant="contained" onClick={handleSend}>
          OK
        </Button>
      </FormGroup>
    </div>
  );
};

export default PatientList;
