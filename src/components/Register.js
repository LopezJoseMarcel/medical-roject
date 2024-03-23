import React, { useState } from "react";
import '../styles/Login.css';
import registerService from "../services/registerService";
import { Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom"

const Register = (props) => {
  //using hook to handle the email state
  const [email, setEmail] = useState('');
  const [contrasenha, setPassword] = useState('');
  const [nombre, setName] = useState('');
  const [apellido, setApellido] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate("/form-data",{ state: { email: email, nombre: nombre, apellido: apellido} })
  }

  const validatePassword = (password) => {
    // Expresión regular para validar la contraseña
    const passwordPattern = /^[A-Za-z0-9]{8,}$/;

    if (!passwordPattern.test(password)) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres y solo puede contener letras y números.');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  //  validatePassword(e.target.value);
    // Validar la contraseña antes de enviarla
    if (!validatePassword(contrasenha)) {
      setLoading(false);
      return;
    }
  
    registerService({
      nombre,
      apellido,
      email,
      contrasenha ,
    })
      .then(response => {
        if (response.error) {
          setLoading(false);
          setError(new Error(response.error));
          setSuccess(false);
        } else {
          setLoading(false);
          setError(null);
          setSuccess(true);
        }
      })
      .catch(error => {
        setLoading(false);
        setSuccess(false);
        setError(new Error(error.message));
      });
    
  };
 
  return (
    <div className="max-container">
      <h2>Register</h2>
      {!loading && !success &&
      <>
        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="input-name">Nombre</label>
          <input required value={nombre} name="name" type="text" id="input-name" onChange={(e) => {setName(e.target.value)}} placeholder="Nombre completo" />
          <label htmlFor="input-apellido">Apellido</label>
          <input required value={apellido} name="apellido" type="text" id="input-apellido" onChange={(e) => {setApellido(e.target.value)}} placeholder="Apellido" />
          <label htmlFor="register-input-email" >Correo</label>
          <input required value={email} name="email" type="email" id="register-input-email" placeholder="tucorreo@gmail.com" onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="register-input-password" >Contraseña</label>
          <input required value={contrasenha} name="password" id="register-input-password" 
            type="password" placeholder="mas de ocho caracteres, sin simbolos" 
            onChange={(e) => {
              setPassword(e.target.value);
              // Validar la contraseña al escribir
              
            }} />
            {passwordError && <p className="error-message">{passwordError}</p>}
          <button type="submit" className="button-form">Crear</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}> Ya tengo una cuenta? Inicie sesion aqui. </button>
      </>
      }
      {loading && 
        <Box sx={{ display: 'flex' }}>
        <CircularProgress />
        </Box> 
      }
      {error && <strong>Error al crear usuario</strong>}
      {success &&  
        <>
          <label>Usuario registrado con exito</label>
          <button  type="button" className="button-form" onClick={handleNavigate}>Aceptar</button>
        </>
      }
    </div>
  );
};

export default Register;
