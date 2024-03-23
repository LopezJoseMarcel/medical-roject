import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
//import createEnferService from '../services/createEnferService';
import createMediService from "../services/createMediService";
import '../styles/InsertForm.css';

const InsertFormMedicamento= () => {
  const [nombre, setNombre] = useState("");
  const [presentacion, setPresentacion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [usos, setUsos] = useState([]);
  const [efectosSecundarios, setEfectosSecundarios] = useState([]);
  const [administracion, setAdministracion] = useState([]);
  const [dosis_alert, setDosis_alert] = useState(null);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleAgregarMedicamento = async () => {
    if (!dosis_alert || !nombre || !presentacion || !descripcion || usos.length === 0 || efectosSecundarios.length === 0 || administracion.length === 0) {
      setError("Todos los campos deben ser llenados");
      return;
    }

    const medicamentoData = {
      nombre: nombre,
      presentacion: presentacion,
      descripcion: descripcion,
      usos: usos,
      efectos_secundarios: efectosSecundarios,
      administracion:administracion,
      dosis_alert : dosis_alert,
    };

    try {
      const response = await createMediService(medicamentoData);
      // Aquí puedes manejar la respuesta del servicio si es necesario
      console.log(response);
      // Limpiar los campos después de la inserción exitosa
      setNombre("");
			setDescripcion("");
			setPresentacion("");
      setDosis_alert("");

			setUsos([]);
			setEfectosSecundarios([]);
			setAdministracion([]);
      setSuccessMessage("Medicamento agregado exitosamente");
    } catch (error) {
      setError("Error al crear la enfermedad");
      console.error(error);
    }
  };

  const handleLimpiarCampos = () => {
    setNombre("");
    setDescripcion("");
    setPresentacion("");
    setDosis_alert("");

    setUsos([]);
    setEfectosSecundarios([]);
    setAdministracion([]);

    setError("");
    setSuccessMessage("");
  };

  const handleUsosChange = (event) => {
    const value = event.target.value;
    const separatedValues = value.split(",");
    setUsos(separatedValues);
  };

  const handleEfecSecuChange = (event) => {
    const value = event.target.value;
    const separatedValues = value.split(",");
    setEfectosSecundarios(separatedValues);
  };

	const handleAdministracionChange = (event) => {
    const value = event.target.value;
    const separatedValues = value.split(",");
    setAdministracion(separatedValues);
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
        label="Presentación"
        type="text"
        multiline
        value={presentacion}
        onChange={(e) => setPresentacion(e.target.value)}
      />

      <TextField
        label="Usos"
        type="text"
        multiline
        value={usos.join(",")}
        onChange={handleUsosChange}
      />
      <TextField
        label="Efectos Secundarios"
        type="text"
        multiline
        value={efectosSecundarios.join(",")}
        onChange={handleEfecSecuChange}
      />

      <TextField
        label="Administración"
        type="text"
        multiline
        value={administracion .join(",")}
        onChange={handleAdministracionChange}
      />

      <TextField
        label="Presentación"
        type="number"
        multiline
        value={dosis_alert}
        onChange={(e) => setDosis_alert(e.target.value)}
      />

      <div id="button-container">
        <Button variant="contained" onClick={handleAgregarMedicamento}>
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

export default InsertFormMedicamento;