import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import '../styles/Appointment.css';
import { Button, Snackbar } from '@mui/material';

const Appointment = (props) => {
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleCheckboxChange = (e) => {
    const horario = e.target.value;
    props.onHorarioSeleccionado(horario);
  };

  const handleCrearCita = () => {
    props.onCrearCita();
    setShowSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
    props.onVolverAtras();
  };

  return (
    <FormGroup className='checkbox-container'>
      <FormControlLabel
        control={
          <Checkbox
            id={'1'}
            key={'1'}
            value={'15:00-15:30'}
            onChange={handleCheckboxChange}
            disabled={props.horariosOcupados.includes('15:00-15:30')}
          />
        }
        label='15:00 hs - 15:30hs'
      />
      <FormControlLabel
        control={
          <Checkbox
            id={'2'}
            key={'2'}
            value={'15:30-16:00'}
            onChange={handleCheckboxChange}
            disabled={props.horariosOcupados.includes('15:30-16:00')}
          />
        }
        label='15:30 hs - 16:00hs'
      />
      <FormControlLabel
        control={
          <Checkbox
            id={'3'}
            key={'3'}
            value={'16:00-16:30'}
            onChange={handleCheckboxChange}
            disabled={props.horariosOcupados.includes('16:00-16:30')}
          />
        }
        label="16:00 hs - 16:30hs"
      />
	   <FormControlLabel
        control={
          <Checkbox
            id={'4'}
            key={'4'}
            value={'16:30-17:00'}
            onChange={handleCheckboxChange}
            disabled={props.horariosOcupados.includes('16:30-17:00')}
          />
        }
        label="16:30hs - 17:00hs"
      />
	  <FormControlLabel
        control={
          <Checkbox
            id={'5'}
            key={'5'}
            value={'17:00-17:30'}
            onChange={handleCheckboxChange}
			disabled={props.horariosOcupados.includes('17:00-17:30')}
          />
        }
        label="17:00hs - 17:30hs"
      />
	  <FormControlLabel
        control={
          <Checkbox
            id={'6'}
            key={'6'}
            value={'17:30-18:00'}
            onChange={handleCheckboxChange}
			disabled={props.horariosOcupados.includes('17:30-18:00')}
          />
        }
        label="17:30hs - 18:00hs"
      />
	  <FormControlLabel
        control={
          <Checkbox
            id={'7'}
            key={'7'}
            value={'18:00-18:30'}
            onChange={handleCheckboxChange}
			disabled={props.horariosOcupados.includes('18:00-18:30')}
          />
        }
        label="18:00hs -18:30hs"
      />
	  <FormControlLabel
        control={
          <Checkbox
            id={'8'}
            key={'8'}
            value={'18:30-19:00'}
            onChange={handleCheckboxChange}
			disabled={props.horariosOcupados.includes('18:30-19:00')}
          />
        }
        label="18:30hs - 19:00hs"
      />
      <Button onClick={props.onVolverAtras}>Atrás</Button>
      <Button onClick={handleCrearCita}>Ok</Button>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message='Cita registrada con éxito'
      />
    </FormGroup>
  );
};

export default Appointment;
/*import React from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState } from "react";
import '../styles/Appointment.css';
import { Button, Snackbar } from "@mui/material";

const Appointment = (props) => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [horariosOcupados, setHorariosOcupados] = useState({});

  const handleCheckboxChange = (e) => {
    const horario = e.target.value;
    props.onHorarioSeleccionado(horario);
  };
  
  const handleCrearCita = () => {
    props.onCrearCita();
    setShowSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
    props.onVolverAtras();
  };

  const actualizarHorariosOcupados = (citasDelDia) => {
    const horariosOcupados = {};
    citasDelDia.forEach(cita => {
      horariosOcupados[cita.turno] = true;
    });
    setHorariosOcupados(horariosOcupados);
  };

  return (
    <FormGroup className='checkbox-container'>
      <FormControlLabel
        control={
          <Checkbox
            id={'1'}
            key={'1'}
            value={'15:00-15:30'}
            onChange={handleCheckboxChange}
            disabled={horariosOcupados['15:00-15:30']}
            checked={horariosOcupados['15:00-15:30']}
          />
        }
        label="15:00 hs - 15:30hs"
      />
      <FormControlLabel
        control={
          <Checkbox
            id={'2'}
            key={'2'}
            value={'15:30-16:00'}
            onChange={handleCheckboxChange}
            disabled={horariosOcupados['15:30-16:00']}
            checked={horariosOcupados['15:30-16:00']}
          />
        }
        label="15:30 hs - 16:00hs"
      />
      <FormControlLabel
        control={
          <Checkbox
            id={'3'}
            key={'3'}
            value={'16:00-16:30'}
            onChange={handleCheckboxChange}
            disabled={horariosOcupados['16:00-16:30']}
            checked={horariosOcupados['16:00-16:30']}
          />
        }
        label="16:00 hs - 16:30hs"
      />
	   <FormControlLabel
        control={
          <Checkbox
            id={'4'}
            key={'4'}
            value={'16:30-17:00'}
            onChange={handleCheckboxChange}
            disabled={horariosOcupados['16:30-17:00']}
            checked={horariosOcupados['16:30-17:00']}
          />
        }
        label="16:30hs - 17:00hs"
      />
	  <FormControlLabel
        control={
          <Checkbox
            id={'5'}
            key={'5'}
            value={'17:00-17:30'}
            onChange={handleCheckboxChange}
            disabled={horariosOcupados['17:00-17:30']}
            checked={horariosOcupados['17:00-17:30']}
          />
        }
        label="17:00hs - 17:30hs"
      />
	  <FormControlLabel
        control={
          <Checkbox
            id={'6'}
            key={'6'}
            value={'17:30-18:00'}
            onChange={handleCheckboxChange}
            disabled={horariosOcupados['17:30-18:00']}
            checked={horariosOcupados['17:30-18:00']}
          />
        }
        label="17:30hs - 18:00hs"
      />
	  <FormControlLabel
        control={
          <Checkbox
            id={'7'}
            key={'7'}
            value={'18:00-18:30'}
            onChange={handleCheckboxChange}
            disabled={horariosOcupados['18:00-18:30']}
            checked={horariosOcupados['18:00-18:30']}
          />
        }
        label="18:00hs -18:30hs"
      />
	  <FormControlLabel
        control={
          <Checkbox
            id={'8'}
            key={'8'}
            value={'18:30-19:00'}
            onChange={handleCheckboxChange}
            disabled={horariosOcupados['18:30-19:00']}
            checked={horariosOcupados['18:30-19:00']}
          />
        }
        label="18:30hs - 19:00hs"
      />
      
      <Button onClick={props.onVolverAtras}>Atrás</Button>
      <Button onClick={handleCrearCita}>Ok</Button>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Cita registrada con éxito"
      />
    </FormGroup>
  );
};

export default Appointment; */