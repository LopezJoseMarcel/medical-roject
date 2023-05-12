import React,{useState} from 'react';
import Register from '../components/Register';
import Login from '../components/Login';

const Forms = () => {

    const [currentForm, setForm] = useState('login');
 
    const toggleForm = (formName) => {
      setForm(formName);
    }

    return(
        <>
         {
          currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm}/>
         }
        </>    
    );
};

export default Forms;
