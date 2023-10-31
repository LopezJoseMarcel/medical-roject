//
import React, { useState, useEffect, useCallback } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckIcon from '@mui/icons-material/Check';
import EnfermedadComponent from './EnfermedadComponent';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import get_object_disease from '../services/get_object_disease';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import '../styles/DiseasesList.css';
import countInput from '../utils/countInput';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// Services
import allEnferService from '../services/allEnferService';
import trainModel from '../services/trainModel';
import updateEnfermedadService from '../services/updateEnfermedadService';

export default function DiseasesList() {
  // States
  const [enfermedades, setEnfermedades] = useState([]);
  const [allEnfermedades, setAllEnfermedades] = useState([]);
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [total, setTotal] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const [success, setSuccess] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [backdrop, setBackdrop] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState(null);

  // Fetch
  const fetchEnfermedades = useCallback(async () => {
    try {
      const data = await allEnferService();
      setAllEnfermedades(data);
      const enfermedadesEntrenadas = data.filter((enfermedad) => enfermedad.enfermedad_entrenada);
      setEnfermedades(enfermedadesEntrenadas);
    } catch (error) {
      throw new Error(error.message);
    }
  }, []);

  // useEffect para cargar las enfermedades al inicio
  useEffect(() => {
    fetchEnfermedades();
  }, [fetchEnfermedades]);

  // Handler para guardar
 /* const handleGuardar = () => {
    fetchEnfermedades();
  };*/

  const handleCloseDialog = () => {
    setShowDialog(false);
    fetchEnfermedades();
  };

  // Handler para actualizar enfermedad entrenada
  const handleUpdateEnfer = () => {
    const res = updateEnfermedadService(selectedDisease._id, { enfermedad_entrenada: true });
    console.log(res);
  };

  // Handler para entrenar
  const handleEntrenar = () => {
    setBackdrop(true);
    trainModel(selectedDisease.numero_diccionario)
      .then(() => {
        setDialogMessage('El modelo ha sido entrenado exitosamente');
        setBackdrop(false);
        setShowDialog(true);
        // Actualizar la lista después de entrenar
        handleUpdateEnfer()
        //fetchEnfermedades();
      })
      .catch((err) => {
        console.log(err);
        setDialogMessage('Error al entrenar el Modelo');
        setBackdrop(false);
        setShowDialog(true);
      });
  };

  // Handler para cambiar la enfermedad seleccionada
  const handleDiseaseChange = (event, value) => {
    if (value) {
      setSelectedDisease(value);
      setIsSelected(true);
      const objectData = get_object_disease(value.numero_diccionario);
      objectData.then((res) => {
        setTotal(countInput(res));
        if (countInput(res) > 100) {
          setMensaje('es suficiente para realizar el entrenamiento');
          setDisabled(false);
          setSuccess(true);
        } else {
          setMensaje('es insuficiente para realizar el entrenamiento');
          setDisabled(false); // true
          setSuccess(true);
        }
        const data = Object.keys(res).map((categoria) => ({
          name: 'Tratamiento: ' + categoria,
          value: res[categoria].output.length,
          fill: getRandomColor(),
        }));
        setChartData(data);
      });
    } else {
      setSelectedDisease(null);
      setIsSelected(false);
      setSuccess(false);
    }
  };

  // Función para obtener colores aleatorios
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div id='max-container'>
      <div id='column'>
        <div>
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Modelos Entrenados de Enfermedades
              </ListSubheader>
            }
          >
            {enfermedades.map((enfermedad, index) => (
              <ListItemButton key={index}>
                <ListItemIcon>
                  <CheckIcon />
                </ListItemIcon>
                <ListItemText primary={enfermedad.nombre} />
              </ListItemButton>
            ))}
          </List>
        </div>
        <div id="container-enfermedadComponent">
          <EnfermedadComponent handleGuardar={fetchEnfermedades} />
        </div>
      </div>
      <div id='column2'>
        <label id='selection'>Seleccione una enfermedad para entrenar:</label>
        <div className="diagnostico-presuntivo-container">
          <Autocomplete
            disablePortal
            id="combo-DiagnosticoPresuntivo"
            options={allEnfermedades}
            getOptionLabel={(option) => option.nombre}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Enfermedad" />}
            onChange={handleDiseaseChange}
          />
        </div>
        {isSelected && chartData && (
          <div>
            <PieChart width={300} height={300}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            <p id='total'>
              {`Total de registros de la enfermedad: ${total}`}
            </p>
            {success && (
              <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert onClose={() => { setSuccess(false) }} severity="info">
                  La cantidad de registros {mensaje}
                </Alert>
              </Stack>
            )}
          </div>
        )}
        <div>
          <Button onClick={handleEntrenar} disabled={disabled} variant="contained">Entrenar Modelo</Button>
        </div>
        <div>
          {backdrop && <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={backdrop}
          >
            <CircularProgress color="inherit" />
          </Backdrop>}
          {showDialog && (
            <Dialog
              open={showDialog}
              onClose={handleCloseDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Machine Learning Model"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {dialogMessage}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Cerrar</Button>
              </DialogActions>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
}
