import './styles/App.css'
import React from 'react';
import { useState } from 'react';
//import Login from '../components/Login';
//import Register from '../components/Register';
//import Calendar from '../components/Calendar';
//import Appointment from '../components/Appointment';
//import Header from './containers/Header';
//import FormData from './components/FormData';
//import InfoPatient from './containers/InfoPatient';
import AppointmentPage from './containers/AppointmentPage';


function App() {
 //form
 const [currentForm, setForm] = useState('login');
 
  const toggleForm = (formName) => {
    setForm(formName);
  }
 //end form

 //Calendar
   const [currentViewCalendar, setCurrentViewCalendar] = useState('calendar');

   const changeView  = (view) => {
     setCurrentViewCalendar(view);
   };
 //end Calendar
 
  return (
    //test login 
    /*<div className="App">
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm}/>
      }
    </div>*/
     //
     /*
    <div className="App">
       {
         currentViewCalendar === 'appointment' ? <Appointment changeView={changeView} /> : <Calendar changeView={changeView}/> 
       } 
    </div>*/

    //test Header
    /*
    <div className='App'>
      <Header/>
    </div>*/

    <div className='App'>
      <AppointmentPage/>
    </div>

  );
}


 
export default App;
