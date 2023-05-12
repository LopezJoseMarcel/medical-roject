import React from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState } from "react";
import '../styles/PatientList.css';
import { Button } from "@mui/material";





const PatientList = (props) => {

//Section to save the appointment 
const [checked, setChecked] = useState([]);

const handleChange = (e) => {
    const object = {
		isChecked: e.target.checked,
		timeValue: e.target.value,
		id: e.target.id,
	};

	if (object.isChecked) {
	  const appointmentUpdate = [object, ...checked];
	  setChecked(appointmentUpdate);
	}else{
		const checkedUpdate = checked.filter(appointment => appointment.id !== object.id );
		setChecked(checkedUpdate);
	}

	console.log(checked);
}//end section

//section to send the appointment

const handleSend = () =>{
	console.log(checked);
} ;


//end section to send the appointment	

    return (
    <FormGroup className='checkbox-container'>
		<FormControlLabel control={<Checkbox id={'1'} key={'1'} value={'15:00-15:30'} onChange={handleChange} />} label="15:00 hs - 15:30hs Ruben Dario" />
		<FormControlLabel control={<Checkbox id={'2'} key={'2'} value={'15:30-16:00'} onClick={handleChange} />} label="15:30 hs - 16:00hs Jose Marcel Lopez"  />
		<FormControlLabel control={<Checkbox id={'3'} key={'3'} value={'16:00-16:30'} onClick={handleChange} />} label="16:00 hs - 16:30hs Federico Gonzales" />
		<FormControlLabel control={<Checkbox id={'4'} key={'4'} value={'16:30-17:00'} onClick={handleChange} />} label="16:30 hs - 17:00hs Felix Rodas" />
		<FormControlLabel control={<Checkbox id={'5'} key={'5'} value={'17:00-17:30'} onClick={handleChange} />} label="17:00 hs - 17:30hs -" />
		<FormControlLabel control={<Checkbox id={'6'} key={'6'} value={'17:30-18:00'} onClick={handleChange} />} label="17:30 hs - 18:00hs -" />
		<FormControlLabel control={<Checkbox id={'7'} key={'7'} value={'18:00-18:30'} onClick={handleChange} />} label="18:00 hs - 18:30hs -" />
		<FormControlLabel control={<Checkbox id={'8'} key={'8'} value={'18:30-19:00'} onClick={handleChange} />} label="18:30 hs - 19:00hs -" />
		<FormControlLabel control={<Checkbox id={'9'} key={'9'} value={'19:00-19:30'} onClick={handleChange} />} label="19:00 hs - 19:30hs -" />
		<FormControlLabel control={<Checkbox id={'10'} key={'10'} value={'19:30-20:00'} onClick={handleChange} checked disabled/>} label="19:30 hs - 20:00hs -" />
        <Button onClick={() => props.changeView('calendar') } >Atras</Button> 
		<Button onClick={handleSend}>Ok</Button>
	</FormGroup>);
}

export default PatientList;