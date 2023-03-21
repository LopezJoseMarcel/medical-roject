import React from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState } from "react";
import '../styles/Appointment.css';





const Appointment = () => {
//Hooks to handle the appointment date
const [appointmentValue, setAppointmentValue] = useState('');

console.log(appointmentValue);


    return (
    <FormGroup className='checkbox-container'>
			<FormControlLabel control={<Checkbox value={appointmentValue} onChange={setAppointmentValue} />} label="15:00 hs - 15:30hs" />
			<FormControlLabel control={<Checkbox value={appointmentValue} onChange={setAppointmentValue} />} label="15:30 hs - 16:00hs" />
			<FormControlLabel control={<Checkbox value={appointmentValue} onChange={setAppointmentValue} />} label="16:00 hs - 16:30hs" />
			<FormControlLabel control={<Checkbox value={appointmentValue} onChange={setAppointmentValue} />} label="16:30 hs - 17:00hs" />
			<FormControlLabel control={<Checkbox value={appointmentValue} onChange={setAppointmentValue} />} label="17:00 hs - 17:30hs" />
			<FormControlLabel control={<Checkbox value={appointmentValue} onChange={setAppointmentValue} />} label="17:30 hs - 18:00hs" />
			<FormControlLabel control={<Checkbox value={appointmentValue} onChange={setAppointmentValue} />} label="18:00 hs - 18:30hs" />
			<FormControlLabel control={<Checkbox value={appointmentValue} onChange={setAppointmentValue} />} label="18:30 hs - 19:00hs" />
			<FormControlLabel control={<Checkbox value={appointmentValue} onChange={setAppointmentValue} />} label="19:00 hs - 19:30hs" />
			<FormControlLabel control={<Checkbox value={appointmentValue} onChange={setAppointmentValue} checked disabled/>} label="19:00 hs - 19:30hs" />
    </FormGroup>);
}

export default Appointment;

