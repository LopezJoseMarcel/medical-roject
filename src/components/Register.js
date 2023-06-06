import React, { useState, useEffect} from "react";
import '../styles/Loging.css';
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
  const navigate = useNavigate();

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate("/form-data",{ state: { email: email, nombre: nombre, apellido: apellido} })
  }

  /*useEffect(() => {
    if (success) {
      props.onFormSwitch('login');
    }
  }, [success, props]);*/

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  
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
          <input value={nombre} name="name" type="text" id="input-name" onChange={(e) => {setName(e.target.value)}} placeholder="Nombre completo" />
          <label htmlFor="input-apellido">Apellido</label>
          <input value={apellido} name="apellido" type="text" id="input-apellido" onChange={(e) => {setApellido(e.target.value)}} placeholder="Apellido" />
          <label htmlFor="register-input-email" >Correo</label>
          <input value={email} name="email" type="email" id="register-input-email" placeholder="tucorreo@gmail.com" onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="register-input-password" >Contraseña</label>
          <input value={contrasenha} name="password" id="register-input-password" type="password" placeholder="mas de ocho caracteres, sin simbolos" onChange={(e) => setPassword(e.target.value)} />
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
