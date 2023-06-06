import './styles/App.css'
import React from 'react';
import { Route,Routes } from 'react-router-dom';
import AppointmentPage from '../src/pages/AppointmentPage';
import DoctorPage from '../src/pages/DoctorPage';
import Forms from '../src/pages/Forms';
import Home from '../src/pages/Home';
import InfoPatient from '../src/pages/InfoPatient';
import Header from './containers/Header';
import FormData from './components/FormData'
import { UserContextProvider } from './context/UserContext'


function App() {
 
 
  return (
    
    
    <div className='App'>
      <UserContextProvider>
        <Routes>
          <Route path='/' element={ <Home/> }/>
          <Route path='/forms' element={ <Forms/> }/>
          <Route path='/appointment-page' element={ <AppointmentPage/> }/>
          <Route path='/doctor-page' element={ <DoctorPage/> }/>
          <Route path='/info-patient' element={ <InfoPatient/> }/>
          <Route path='/form-data' element={ <FormData/> }/>
          </Routes>
      </UserContextProvider>
      
      
   </div>
    
    
  );
}


 
export default App;
