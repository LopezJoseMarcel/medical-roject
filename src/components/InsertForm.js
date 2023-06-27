import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import createEnferService from '../services/createEnferService';
import '../styles/InsertForm.css';

const InsertForm= () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [sintomas, setSintomas] = useState([]);
  const [causas, setCausas] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleAgregarEnfermedad = async () => {
    if (!nombre || !descripcion || sintomas.length === 0 || causas.length === 0) {
      setError("Todos los campos deben ser llenados");
      return;
    }

    const enfermedadData = {
      nombre: nombre,
      descripcion: descripcion,
      sintomas: sintomas,
      causas: causas
    };

    try {
      const response = await createEnferService(enfermedadData);
      // Aquí puedes manejar la respuesta del servicio si es necesario
      console.log(response);
      // Limpiar los campos después de la inserción exitosa
      setNombre("");
      setDescripcion("");
      setSintomas([]);
      setCausas([]);
      setError("");
      setSuccessMessage("Enfermedad agregada exitosamente");
    } catch (error) {
      setError("Error al crear la enfermedad");
      console.error(error);
    }
  };

  const handleLimpiarCampos = () => {
    setNombre("");
    setDescripcion("");
    setSintomas([]);
    setCausas([]);
    setError("");
    setSuccessMessage("");
  };

  const handleSintomasChange = (event) => {
    const value = event.target.value;
    const separatedValues = value.split(",");
    setSintomas(separatedValues);
  };

  const handleCausasChange = (event) => {
    const value = event.target.value;
    const separatedValues = value.split(",");
    setCausas(separatedValues);
  };

  return (
    <div id="form-container">
      <TextField
        label="Nombre"
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <TextField
        label="Descripción"
        type="text"
        multiline
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <TextField
        label="Síntomas"
        type="text"
        multiline
        value={sintomas.join(",")}
        onChange={handleSintomasChange}
      />
      <TextField
        label="Causas"
        type="text"
        multiline
        value={causas.join(",")}
        onChange={handleCausasChange}
      />
      <div id="button-container">
        <Button variant="contained" onClick={handleAgregarEnfermedad}>
          Agregar
        </Button>
        <Button variant="contained" onClick={handleLimpiarCampos}>
          Limpiar
        </Button>
      </div>
      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default InsertForm;
