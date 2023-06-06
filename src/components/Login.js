import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import '../styles/Loging.css';
import useUser from "../hooks/useUser";
import { Box, CircularProgress } from "@mui/material";


const Login = (props) => {
   //using hook to handle the email state
   const [email, setEmail] = useState('');
   const [contrasenha, setcontrasenha] = useState('');
   //const to navigate 
   const navigate = useNavigate();
   //hooks
   const {isLoginLoading, isLogingError,login, isLoggedIn} = useUser();

   //useEffect for when user is logged, it navigate to "/"
   useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
   },[isLoggedIn, navigate]) //This should changes when isLoggedIn Changed

   const handleSubmit = (e) =>{
     e.preventDefault();  

     console.log(email);
     console.log(contrasenha);

     login(email, contrasenha);
   }

    return(
       <div className="max-container">
        <h2>Login</h2>
        {!isLoginLoading &&
        <>
        <form className="login-form" onSubmit={handleSubmit}>
          <label  htmlFor="input-email" >Correo</label>
          <input value={email} name="email" type="email"
            id="input-email" placeholder="tucorreo@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="input-contrasenha" >Contraseña</label>
          <input value={contrasenha} name="contrasenha" id="input-contrasenha" 
            type="contrasenha" placeholder=""
            onChange={(e) => setcontrasenha(e.target.value)}
          />
          <button  type="submit" className="button-form">Iniciar</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('register')}>
          No tengo una cuenta? Registrece aqui.
        </button>
        </>
        }
        {
          isLoginLoading &&
          <Box sx={{ display: 'flex' }}>
          <CircularProgress />
          </Box> 
        }
        {
          isLogingError && <strong>Credenciales Invalidas</strong>
        }
        
       </div> 
        
       
    )
}

export default Login;