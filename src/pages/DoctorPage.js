import React from "react";
import { useState } from "react";
import '../styles/DoctorPage.css';
import Calendar from '../components/Calendar'
import PatientList from "../components/PatientList";
import MedicalConsultation from "../components/MedicalConsultation";

const DoctorPage = () => {
//Calendar
const [currentViewCalendar, setCurrentViewCalendar] = useState('calendar');

const changeView  = (view) => {
  setCurrentViewCalendar(view);
};
//end Calendar

    return(
      <div className="container-main">
        {
              currentViewCalendar === 'appointment' ? <PatientList changeView={changeView} /> : <Calendar changeView={changeView}/> 
        } 
        <MedicalConsultation></MedicalConsultation>

      </div>
    );
} 

export default DoctorPage;

