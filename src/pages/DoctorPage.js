import React, { useState } from 'react';
import '../styles/DoctorPage.css';
import CalendarCon from '../components/CalendarCon';
import PatientList from '../components/PatientList';
import MedicalConsultation from '../components/MedicalConsultation';

const DoctorPage = () => {
  const [currentView, setCurrentView] = useState('calendar');
  const [citas, setCitas] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const changeView = (view, user) => {
    setCurrentView(view);
    setSelectedUser(user);
  };

  return (
    <div className="container-main">
      {currentView === 'appointment' ? (
        <PatientList citas={citas} changeView={changeView} />
      ) : (
        <CalendarCon setCitas={setCitas} changeView={changeView} />
      )}
      <MedicalConsultation selectedUser={selectedUser} />
    </div>
  );
};

export default DoctorPage;
