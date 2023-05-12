import './styles/App.css'
import React from 'react';
import { Route,Routes } from 'react-router-dom';
import AppointmentPage from '../src/pages/AppointmentPage';
import DoctorPage from '../src/pages/DoctorPage';
import Forms from '../src/pages/Forms';
import Home from '../src/pages/Home';
import InfoPatient from '../src/pages/InfoPatient';
import Header from './containers/Header';

function App() {
 
 
  return (
    
    
    <div className='App'>
      
      <Routes>
        <Route path='/' element={ <Home/> }/>
        <Route path='/forms' element={ <Forms/> }/>
        <Route path='/appointment-page' element={ <AppointmentPage/> }/>
        <Route path='/doctor-page' element={ <DoctorPage/> }/>
        <Route path='/info-patient' element={ <InfoPatient/> }/>
      </Routes>
      
   </div>
    
    
  );
}


 
export default App;
