import React, { useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button, Snackbar } from '@mui/material';
import '../styles/Appointment.css';

// ... (imports)

const Appointment = (props) => {
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);

  const handleCheckboxChange = (e) => {
    const horario = e.target.value;
    setHorarioSeleccionado(horario);
  };

  const handleCrearCita = () => {
    if (horarioSeleccionado) {
      props.onCrearCita(horarioSeleccionado);
    } else {
      console.error('Debes seleccionar un horario antes de crear la cita.');
    }
  };

  return (
    <FormGroup className='checkbox-container'>
      {props.horariosDisponibles.map((horario, index) => 
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              value={horario}
              onChange={handleCheckboxChange}
              checked={horario === horarioSeleccionado}
            />
          }
          label={horario}
        />
      )}
      <Button onClick={props.onVolverAtras}>Atrás</Button>
      <Button onClick={handleCrearCita}>Ok</Button>
    </FormGroup>
  );
};

export default Appointment;