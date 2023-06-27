// Calendar.js
import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { es } from 'date-fns/locale';
import '../styles/Calendar.css';

const Calendar = (props) => {
  const handleDateChange = (date) => {
    props.onFechaSeleccionada(date);
  };

  return (
    <div className='container-calendar'>
      <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          className='datePicker'
          disablePast={true}
          value={props.fechaSeleccionada}
          onChange={handleDateChange}
        />
      </LocalizationProvider>
    </div>
  );
};

export default Calendar;
