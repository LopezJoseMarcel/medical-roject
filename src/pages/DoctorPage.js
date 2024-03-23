import React, { useState } from 'react';
import '../styles/DoctorPage.css';
import CalendarCon from '../components/CalendarCon';
import PatientList from '../components/PatientList';
import MedicalConsultation from '../components/MedicalConsultation';

const DoctorPage = () => {
  const [currentView, setCurrentView] = useState('calendar');
  const [citas, setCitas] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showCalendar, setShowCalendar] = useState(true);

  const resetPage = () => {
    setCurrentView('calendar');
    setCitas([]);
    setSelectedUser(null);
  };

  const changeView = (view, user) => {
    setCurrentView(view);
    setSelectedUser(user);
  };

  return (
    <div className="container-main">
    {showCalendar && currentView === 'calendar' && ( // Condición para mostrar CalendarCon
      <CalendarCon setCitas={setCitas} changeView={changeView} />
    )}
    {currentView === 'appointment' ? (
      <PatientList setShowCalendar={setShowCalendar} citas={citas} changeView={changeView} />
    ) : (
      selectedUser && <MedicalConsultation setShowCalendar={setShowCalendar} resetPage={resetPage} selectedUser={selectedUser} />
    )}
  </div>
  );
};

export default DoctorPage;
