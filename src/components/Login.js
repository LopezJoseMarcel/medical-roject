import React from "react";
import { useState } from "react";
import '../styles/Loging.css';

const Login = (props) => {
   //using hook to handle the email state
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const handleSubmit = (e) =>{
     e.preventDefault();  

     console.log(email);
     console.log(password);
   }

    return(
       <div className="max-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label  htmlFor="input-email" >Correo</label>
          <input value={email} name="email" type="email"
            id="input-email" placeholder="tucorreo@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="input-password" >Contraseña</label>
          <input value={password} name="password" id="input-password" 
            type="password" placeholder=""
            onChange={(e) => setPassword(e.target.value)}
          />
          <button  type="submit" className="button-form">Iniciar</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('register')}>
          No tengo una cuenta? Registrece aqui.
        </button>
       </div> 
        
       
    )
}

export default Login;