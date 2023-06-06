import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { es } from 'date-fns/locale';
import '../styles/Calendar.css';
import { useState } from 'react';


const Calendar = (props) => {
   const [dateValue, setDateValue] = useState(new Date());

  console.log(dateValue);

    return(
    <div className='container-calendar' >
      <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          className='datePicker'
          disablePast={true} 
          value={dateValue}
          onChange={setDateValue}
          onAccept={() => props.changeView('appointment')}
        />
      </LocalizationProvider>   
    </div>    
    
    );
};

export default Calendar;

