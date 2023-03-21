import './styles/App.css';
import React from 'react';
import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Calendar from './components/Calendar';
import Appointment from './components/Appointment';


function App() {
 //form
 const [currentForm, setForm] = useState('login');
 
  const toggleForm = (formName) => {
    setForm(formName);
  }
 //end form

 //Calendar
   const [currentViewCalendar, setCurrentViewCalendar] = useState('');

   const changeView  = (view) => {
     setCurrentViewCalendar(view);
   };
 //end Calendar
 
  return (
    
    <div className="App">
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm}/>
      }
    </div>
    /*
    <div className="App">
       {
         currentViewCalendar === 'appointment' ? <Appointment /> : <Calendar changeView={changeView}/> 
       } 
    </div>*/
  );
}


 
export default App;
