import React, { useState, useEffect } from "react";
import '../styles/FormData.css'
import RadioGroup from "@mui/material/RadioGroup";
import Button from "@mui/material/Button";

import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { useLocation } from 'react-router-dom';
import formDataService from '../services/formDataService';
import { useNavigate } from "react-router-dom"

const FormData = () => {
  const [genero, setGender] = useState(""); // Estado para el género
  const [movil, setPhoneNumber] = useState(""); // Estado para el número de teléfono
  const [cedula, setCI] = useState(""); // Estado para el número de cédula
  const [fecha_nacimento, setBirthDate] = useState(""); // Estado para la fecha de nacimiento
  const [calle, setStreet] = useState(""); // Estado para la calle
  const [barrio, setNeighborhood] = useState(""); // Estado para el barrio
  const [ciudad, setCity] = useState(""); // Estado para la ciudad
  //estados
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  //location to recive the data from Register
  const location = useLocation();
  const  { email, nombre, apellido} = location.state;

  //useEffect 

  useEffect(() => {
    // Verifica si todos los campos tienen valor
    const allFieldsFilled = (
      genero !== "" &&
      movil !== "" &&
      cedula !== "" &&
      fecha_nacimento !== "" &&
      calle !== "" &&
      barrio !== "" &&
      ciudad !== ""
    );

    // Habilita o deshabilita el botón según si todos los campos están llenos
    setDisabledButton(!allFieldsFilled);
  }, [genero, movil, cedula, fecha_nacimento, calle, barrio, ciudad]);

  //navigate
  const navigate = useNavigate();

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate("/forms")
  }

  const handleSubmit = (e) => {
    // Lógica para enviar los datos del formulario
    e.preventDefault();
    setLoading(true);

    formDataService({
      email,
      genero,
      cedula,
      fecha_nacimento,
      calle, 
      barrio,
      ciudad,
       movil
      })
      .then(response => {
        if (response.error) {
          setLoading(false);
          setError(true);
          setSuccess(false);
          console.log(response.error)
        } else {
          setLoading(false);
          setError(false);
          setSuccess(true);
        }
      })
       .catch(error => {
        console.log(error);
        setLoading(false);
        setSuccess(false);
        setError(true)
       })
  };

  return (
    <div className="max-container">
      {!loading && !success &&
        <>
          <div className="full-name">
            <h3 className="name" id="name">{nombre}</h3>
            <h3 className="last-name" id="last-name">{apellido}</h3>
          </div>
          <div className="mail-container">
            <h3 className="mail" id="mail" >{email}</h3>
          </div>
          <div className="info-container">
            <div className="info">
              <label htmlFor="phone-number">Número de teléfono:</label>
              <input
                className="phone-number"
                id="phone-number"
                type="number"
                placeholder="09## ### ###"
                value={movil}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <label htmlFor="ci">Número de Cedula:</label>
              <input
                className="ci"
                id="ci"
                type="number"
                value={cedula}
                onChange={(e) => setCI(e.target.value)}
              />
              <label htmlFor="birth-date">Fecha de nacimiento:</label>
              <input
                className="birth-date"
                id="birth-date"
                type="date"
                value={fecha_nacimento}
                onChange={(e) => setBirthDate(e.target.value)}
              />
              <label htmlFor="gender">Género biológico:</label>
              <div id= "gender">
                <RadioGroup
                  id="gender"
                  value={genero}
                  onChange={handleGenderChange}
                  row
                >
                  <FormControlLabel
                    value="masculino"
                    control={<Radio />}
                    label="Masculino"
                  />
                  <FormControlLabel
                    value="femenino"
                    control={<Radio />}
                    label="Femenino"
                  />
                  
                </RadioGroup>
              </div>
            </div>
            <div className="address-container">
              <h3>Dirección</h3>
              <label htmlFor="street">Calle:</label>
              <input
                className="street"
                id="street"
                type="text"
                value={calle}
                onChange={(e) => setStreet(e.target.value)}
              />
              <label htmlFor="neighborhood">Barrio:</label>
              <input
                className="neighborhood"
                id="neighborhood"
                type="text"
                value={barrio}
                onChange={(e) => setNeighborhood(e.target.value)}
              />
              <label htmlFor="city">Ciudad:</label>
              <input
                className="city"
                id="city"
                type="text"
                value={ciudad}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <Button disabled={disabledButton} onClick={handleSubmit} variant="contained" >Aceptar</Button>
            
          </div>
        </>  
      }
      {error && <strong>Error al crear usuario</strong>}
      {success &&  
        <>
          <label>Usuario creado con exito, ahora ya podes iniciar sesion</label>
          <button   type="button" className="button-form" onClick={handleNavigate}>Aceptar</button>
        </>
      }
    </div>
  );
}

export default FormData;
