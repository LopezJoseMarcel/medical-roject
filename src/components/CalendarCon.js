import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { es } from 'date-fns/locale';
import format from 'date-fns/format';
import '../styles/Calendar.css';
import citaFechaService from '../services/citaFechaService';

const CalendarCon = (props) => {
  const [dateValue, setDateValue] = useState(new Date());
  

  const handleAccept = async () => {
    try {
      const dateFormatted = format(dateValue, 'yyyy-MM-dd');
      const data = await citaFechaService(dateFormatted);
      props.setCitas(data);
      props.changeView('appointment');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-calendar">
      <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          className="datePicker"
          disablePast={true}
          value={dateValue}
          onChange={setDateValue}
          onAccept={handleAccept}
        />
      </LocalizationProvider>
    </div>
  );
};

export default CalendarCon;
