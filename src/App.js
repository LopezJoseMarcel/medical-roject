import './styles/App.css';
import React from 'react';
import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';



function App() {
  //using hook to change the form
  const [currentForm, setForm] = useState('login');

  //Function to toggle the form
  const toggleForm = (formName) => {
    setForm(formName);
  }

  return (
    <div className="App">
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm}/>
      }
    </div>
  );
}
 
export default App;
