import React from "react";
import '../styles/AppointmentPage.css';
import NextAppointment from "../components/NextAppointment";
import Calendar from "../components/Calendar";
import Appointment from "../components/Appointment";
import AppointmentHistory from "../components/AppointmentHistory";
import { useState } from "react";

const AppointmentPage = () => {
  //Calendar
  const [currentViewCalendar, setCurrentViewCalendar] = useState('calendar');

  const changeView  = (view) => {
    setCurrentViewCalendar(view);
  };
//end Calendar

    return (
        <div className="main-container">
          <div className="first-column">
            <NextAppointment/>
            {
              currentViewCalendar === 'appointment' ? <Appointment changeView={changeView} /> : <Calendar changeView={changeView}/> 
            } 
            
          </div>
          <div>
            <h3>Historial de Citas</h3>
            <AppointmentHistory/>
          </div>
        </div>
    );
}

export default AppointmentPage;