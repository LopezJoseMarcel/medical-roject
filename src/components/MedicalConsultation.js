import React from "react";
//-start
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import medicalModelService from '../services/medicalModelService';
import "../styles/ModelComponent.css"
//-end start
import { addDays, format } from "date-fns";
import { useState, useEffect } from "react";
import '../styles/MedicalConsultation.css';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import allEnferService from "../services/allEnferService";
import allMediService from "../services/allMediService";
import EnfermedadComponent from "./EnfermedadComponent";
import createConsultaService from "../services/createConsultaService";
import { Box, CircularProgress } from "@mui/material";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import updateUserService from '../services/updateUserService';
import updateEnfermedadTratamiento from '../services/updateEnfermedadTratamiento';
import createTratamiento from "../services/createTratamiento";
import getUsuarioService from '../services/getUsuarioService';
//Acordion
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//end Acordion
//unidad de medida
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//end unidad
// lesiones ubi
import lesionesAll from '../data/lesiones';
//prediction
import calcularEdad from '../utils/calcularEdad';
//end prediction
//Actualizar el model info
import guardarModelInfo from "../utils/guardarModelInfo";
//fin model info

const unidades = [
  "gota(gt)", "microgota(mgota)","litro(L)",
  "mililitro(mL)", "microlitro(µL)", "centímetro cúbico(cc/cm³)" ,
  "dracma líquida(dr)", "cucharadita(cdita)", "cucharada(cda)" ,
  "gramo(g)", "miligramo(mg)", "microgramo(mcg/µg)",
  "Tabletas", "Cápsulas", "Comprimidos"         
]
//Fecha
const fechaActual = new Date();
//End Fecha

const lesionesPri = lesionesAll.lesionesPri1;
const lesionesSecu= lesionesAll.lesionesSecu2;
//ubicacion de la lesion 
const lesionUbi = lesionesAll.lesionUbi1;
//fin lesiones



const MedicalConsultation = ({selectedUser}) => {

  


  const [usuarioEsSeleccionado, setusuarioEsSeleccionado] = useState(false);
  
  //Tratamiento
  const [medicamento1, setMedicamento1] = useState(null);
  const [cantidad1, setCantidad1] = useState('');
  const [unidad1, setUnidad1] = useState('');
  const [frecuencia1, setFrecuencia1] = useState('');
  const [duracion1, setDuracion1] = useState('');

  const [medicamento2, setMedicamento2] = useState(null);
  const [cantidad2, setCantidad2] = useState('');
  const [unidad2, setUnidad2] = useState('');
  const [frecuencia2, setFrecuencia2] = useState('');
  const [duracion2, setDuracion2] = useState('');  

  const [tratamientoIdPre, setTratamientoIdPre] = useState(null);
  const [tratamientoIdFinal, setTratamientoIdFinal] = useState(null);

  const [tratSucces1, setTratSucces1] = useState(false);
  const [tratError1, setTratError1] = useState(false);
  const [tratLoading1, setTratLoading1] = useState(false);

  const [tratSucces2, setTratSucces2] = useState(false);
  const [tratError2, setTratError2] = useState(false);
  const [tratLoading2, setTratLoading2] = useState(false);

  const [enfermedadFinalExist, setEnfermedadFinalExist] = useState(false);
  const [enfermedadPreExist, setEnfermedadPreExist] = useState(false);

  const [enfermedadIdPre, setEnfermedadIdPre] = useState(null);
  const [enfermedadIdFinal, setEnfermedadIdFinal] = useState(null);

  //end tratamiento 

  //Handlers tratamientos
    // Funciones para manejar los cambios en los campos de los acordeones
  const handleMedicamento1Change = (event,value) => {
    setMedicamento1(value);
  };
  

  const handleCantidad1Change = (event) => {
    setCantidad1(event.target.value);
  };

  const handleUnidad1Change = (event) => {
    setUnidad1(event.target.value);
  };

  const handleFrecuencia1Change = (event) => {
    setFrecuencia1(event.target.value);
  };

  const handleDuracion1Change = (event) => {
    setDuracion1(event.target.value);
  };

  const handleMedicamento2Change = (event, value) => {
    setMedicamento2(value)
  };

  const handleCantidad2Change = (event) => {
    setCantidad2(event.target.value);
  };

  const handleUnidad2Change = (event) => {
    setUnidad2(event.target.value);
  };

  const handleFrecuencia2Change = (event) => {
    setFrecuencia2(event.target.value);
  };

  const handleDuracion2Change = (event) => {
    setDuracion2(event.target.value);
  };
    //Funcion de limpieza tratamientos
      const limpiarTratamientosPresuntivo = () => {
        setMedicamento1(null);
        setCantidad1("");
        setUnidad1('');
        setFrecuencia1('');
        setDuracion1('');
      }

      const limpiarTratamientosFinal = () => {
        setMedicamento2(null);
        setCantidad2('');
        setUnidad2('');
        setFrecuencia2('');
        setDuracion2('');
      }
    //end limpieza funcion

    //tratamientos para consulta 
    const[tratamientosDefinitivos, setTratamientosDefinitivos] = useState([]);
    const[tratamientosPresuntivos, setTratamientosPresuntivos] = useState([]);
    //en tratamiento para consulta
 
  // Función para realizar la solicitud POST
  const handleSubmitTratamientoPresuntivo = async () => {
    try {
      setTratLoading1(true);
      // Construir el objeto de tratamiento con los datos del formulario
      const tratamiento1 = {
        medicamento_id: medicamento1._id,
        cantidad_uso: {
          cantidad: cantidad1,
          unidad: unidad1
        } ,
        frecuencia_diaria_hr: frecuencia1 + " " + "horas" ,
        tratamiento_tiempo:{
          fecha_inicio: format(fechaActual,'yyyy-MM-dd'),
          fecha_fin: format(addDays(fechaActual,duracion1),'yyyy-MM-dd') ,
        },
      };
      // Realizar la solicitud POST al servicio createTratamiento
      const response1 = await createTratamiento(tratamiento1).then((data) => {
        setTratamientoIdPre(data._id);
        setTratamientosPresuntivos([...tratamientosPresuntivos, data._id])
        setConsultaData((prevData) => ({
          ...prevData,
          tratamiento: {
            ...prevData.tratamiento,
            tratamiento_enfer_pre: data._id,
          }
        }));

     

        guardarModelInfo(
        selectededEnfermedadPresuntiva.numero_diccionario,
        [[calcularEdad(usuario_data.fecha_nacimento),
          usuario_data.genero === "masculino" ? 1 : 2,
          selectededEnfermedadPresuntiva.numero_diccionario,
          Number(lesionPrimariaModel),
          Number(ubicacionModel)]],
          [[
            medicamento1.numero_diccionario,
            Number(cantidad1),
            Number(unidades.indexOf(unidad1) + Number(1)),
            Number(frecuencia1),
            Number(duracion1),
          ]]
        ).then((response) => {
          // Manejar la respuesta del servidor si es necesario
          console.log(response);
        }).catch((error) => {
          // Manejar el error si ocurre
          console.error(error);
        });
        


        setTratSucces1(true); setTratError1(false);
        setTratLoading1(false);
        limpiarTratamientosPresuntivo();

        // Llama a guardarModelInfo aquí, pasando los argumentos necesarios


      
        updateEnfermedadTratamiento(enfermedadIdPre,{id_tratamiento:data._id})
        .then((response) => {
          // Manejar la respuesta del servidor si es necesario
          console.log(response);
        }).catch((error) => {
          // Manejar el error si ocurre
          console.error(error);
        });

      }).catch(() => {
        setTratSucces1(false); setTratError1(true);
        setTratLoading1(false);
      });

      console.log(response1);
    } catch (error) {
      // Manejar el error de la solicitud si es necesario
      console.log(error);
    }
  };

  const 
  handleSubmitTratamientoFinal = async () => {
    try {
      // Construir el objeto de tratamiento con los datos del formulario
      const tratamiento2 = {
        medicamento_id: medicamento2._id,
        cantidad_uso: {
          cantidad: cantidad2,
          unidad: unidad2
        } ,
        frecuencia_diaria_hr: frecuencia2 + " " + "horas" ,
        tratamiento_tiempo:{
          fecha_inicio: format(fechaActual,'yyyy-MM-dd'),
          fecha_fin: format(addDays(fechaActual,duracion2),'yyyy-MM-dd') ,
        },
      };
      // Realizar la solicitud POST al servicio createTratamiento
      const response2 = await createTratamiento(tratamiento2).then((data) => {
        setTratamientoIdFinal(data._id);
        setTratamientosDefinitivos([...tratamientosDefinitivos, data._id]);
        setConsultaData((prevData) => ({
          ...prevData,
          tratamiento: {
            ...prevData.tratamiento,
            tratamiento_enfer_final: data._id,
          }
        }));

        guardarModelInfo(
          selectededEnfermedadFinal.numero_diccionario,
          [[calcularEdad(usuario_data.fecha_nacimento),
            usuario_data.genero === "masculino" ? 1 : 2,
            selectededEnfermedadFinal.numero_diccionario,
            Number(lesionPrimariaModel),
            Number(ubicacionModel)]],
            [[
              medicamento2.numero_diccionario,
              Number(cantidad2),
              Number(unidades.indexOf(unidad2) + Number(1)),
              Number(frecuencia2),
              Number(duracion2),
            ]]
          ).then((response) => {
            // Manejar la respuesta del servidor si es necesario
            console.log(response);
          }).catch((error) => {
            // Manejar el error si ocurre
            console.error(error);
          });

        setTratSucces2(true); setTratError2(false);
        setTratLoading2(false);
        limpiarTratamientosFinal();

        updateEnfermedadTratamiento(enfermedadIdFinal,{id_tratamiento:data._id})
        .then((response) => {
          // Manejar la respuesta del servidor si es necesario
          console.log(response);
        }).catch((error) => {
          // Manejar el error si ocurre
          console.error(error);
        });

      }).catch(() => {
        setTratSucces2(false); setTratError2(true);
        setTratLoading2(false);
      });
    console.log(response2);
  
      // Limpiar el formulario o realizar alguna acción adicional después de enviar los tratamientos
  
    } catch (error) {
      // Manejar el error de la solicitud si es necesario
      console.log(error);
    }
  };


  //States
  const [enfermedades, setEnfermedades] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);
  const [consultaData, setConsultaData] = useState({});
  //

  //state para lesiones
  const [lesionesSeleccionadasPri, setLesionesSeleccionadasPri] = useState([]);
  const [lesionesSeleccionadasSecu, setLesionesSeleccionadasSecu] = useState([]); 
  const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState('');
  const[lesionPrimariaModel, setlesionPrimariaModel] = useState('');
  const [lesionSecudariaModel, setlesionSecundariaModel] = useState('');
  const[ubicacionModel, setUbicacionModel] = useState('');
  //

//estados para la consulta
  const [succes, setSucces] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorCargando, setError] = useState(false);
//
//estados para acordion
const [expandedAccordion1, setExpandedAccordion1] = useState(false);
const [expandedAccordion2, setExpandedAccordion2] = useState(false);
//
//handle Acording
const handleAccordion1Change = (event, isExpanded) => {
  setExpandedAccordion1(isExpanded);
};

const handleAccordion2Change = (event, isExpanded) => {
  setExpandedAccordion2(isExpanded);
};
//

  //States End

  //Fetch Functions
  const fetchEnfermedades = async () => {
    try {
      const data = await allEnferService();
      setEnfermedades(data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  const fetchMedicamentos = async () => {
    try {
      const data = await allMediService();
      setMedicamentos(data);
      console.log(medicamentos);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
  const [usuario_data, setUsuario_data] = useState(null);

  const fetchUsuario = async () => {
    try {
      const data = await getUsuarioService(selectedUser.usuario_id)
      setUsuario_data(data);
      console.log(usuario_data);
      setusuarioEsSeleccionado(true);
    } catch (error) {
      throw new Error(error.message);
    }
  }
 
  const handleGuardarCon = async () => {
    try {
      setLoading(true);
      const { usuario_id, cita_id } = selectedUser;
      const response = await createConsultaService({
        ...consultaData,
        
        examen_fisico: {
          ...consultaData.examen_fisico,
          piel: {
            ...consultaData.examen_fisico.piel,
            m_p_v_p_c_h: lesionesSeleccionadasPri.concat(lesionesSeleccionadasSecu),
          },
        },
        
        tratamiento_presuntivo: tratamientosPresuntivos,
        tratamiento_final: tratamientosDefinitivos,
        usuario_id,
        cita_id,
        ubicacion_lesion: ubicacionSeleccionada,
        
      }).then(res => {
        setLoading(false);
        setSucces(true);
        setError(false);
      })
        .catch(err => {
        console.log(err);
        setSucces(false);
        setError(true);
        setLoading(false);
      });

      const updateUsuarioResponse = await updateUserService(selectedUser.usuario_id,
        {"tratamiento": tratamientosPresuntivos.concat(tratamientosDefinitivos),
         "tratamiento_activo": true,
         "enfermedad_activa": true,
         "enfermedad": enfermedadIdFinal ? [enfermedadIdFinal] : [],
         "enfermedad_presuntiva": enfermedadIdPre ? [enfermedadIdPre] : [],
        })
        .then(data => console.log(data))
        .catch(err => console.log(err));
       

      console.log(updateUsuarioResponse);

      console.log(response); // Aquí puedes manejar la respuesta de la API como desees
      
    } catch (error) {
      console.error(error); // Maneja el error en caso de que la llamada a la API falle
    }
  };

  //manejadores del Form------------------------------------------------------------
  const handleMotivoConsultaChange = (event) => {
    const value = event.target.value;
    setConsultaData((prevData) => ({
      ...prevData,
      motivo_consulta: value
    }));
  };

  const handleExamenFisicoChange = (event) => {
    const field = event.target.name; // Obtener el nombre del campo
    const value = event.target.value; // Obtener el valor del campo
  
    setConsultaData((prevData) => ({
      ...prevData,
      examen_fisico: {
        ...prevData.examen_fisico, // Mantener los valores anteriores del subdocumento
        [field]: value // Actualizar el campo específico dentro del subdocumento
      }
    }));
  };

  //
  
  //en manejadores del form---------------------------------------------------------------
 
  useEffect(() => {
    fetchMedicamentos();
    fetchEnfermedades();
  }, []);

  const handleGetUsuario = () => {
    fetchUsuario();
  }

  const handleGuardar  = () => {
    fetchEnfermedades();
  };
//
  const [selectededEnfermedadFinal, setSelectededEnfermedadFinal] = useState(null);
  const handleDiagnosticoFinalChange = (event, value) => {
    if (value) {
        //handleGetUsuario();
        fetchUsuario().then(data => console.log(data)).catch(console.log("error al fetch usuario"))
        setEnfermedadIdFinal(value._id);
        setSelectededEnfermedadFinal(value);
        setEnfermedadFinalExist(true);
        const selectedOption = value ? value._id : null; // Obtén el ID de la opción seleccionada
    setConsultaData((prevData) => ({
      ...prevData,
      diagnostico: {
        ...prevData.diagnostico,
        diagnostico_final: selectedOption,
      },
    }));
    }else{ setEnfermedadFinalExist(false); }
  
  };
  
  const [selectededEnfermedadPresuntiva, setSelectededEnfermedadPresuntiva] = useState(null);
  const handleDiagnosticoPresuntivoChange = (event, value) => {
    if (value) {
      handleGetUsuario();
      setEnfermedadIdPre(value._id);
      setEnfermedadPreExist(true);
      const selectedOption = value ? value._id : null; // Obtén el ID de la opción seleccionada
      setSelectededEnfermedadPresuntiva(value);
    setConsultaData((prevData) => ({
      ...prevData,
      diagnostico: {
        ...prevData.diagnostico,
        diagnostico_presuntivo: selectedOption,
      },
    }));
    }else{
      setEnfermedadPreExist(false);
    }
  };
  
  //data from child


  //model 
  const [open, setOpen] = useState(false);
  const [isPre, setIsPre] = useState(false);
  const [predictionData, setPredictionData] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null); // Nuevo estado para el valor seleccionado
  const [selectedDataObject, setSelectedDataObject] = useState({}); // Valores en forma de objetos
  const outputsValues = [1, 2, 3];
  const [disabled, setDisabled] = useState(true);
  const [freesoloPresuntivo, setfresolopresuntivo] = useState(true);
  const [freesoloFinal, setfresoloFinal] = useState(true);
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Llamar al servicio aquí y cargar los datos de predicción usando enfermedad, outputs, inputData
  const fetchPredictions = async () => {
    const predictions = [];
    for (const outputs of outputsValues) {
      const prediction = await medicalModelService(
        selectededEnfermedadPresuntiva.numero_diccionario,
        outputs,
        [[calcularEdad(usuario_data.fecha_nacimento),
          usuario_data.genero === "masculino" ? 1 : 2,
          selectededEnfermedadPresuntiva.numero_diccionario,
          Number(lesionPrimariaModel),
          Number(ubicacionModel)]]);

      predictions.push(prediction);
    }
    setPredictionData(predictions);
    setIsPre(true);
    setDisabled(false);
  };

  // Manejar cambios en el Select
  const handlePredicctionChange = (event) => {
    const selectedDataIndex = event.target.value; // Cambia a índice en lugar de objeto
    setSelectedValue(selectedDataIndex);
  };

  const handleAgreeClick = () => {
    if (selectedValue !== null) {
      const selectedData = predictionData[selectedValue]; // Accede al objeto seleccionado por índice
      console.log(selectedData);
      // Realiza cualquier otra acción que desees con los datos seleccionados
      const numeroDiccionario = selectedData.values[0];
      const medicamento = medicamentos.find((elemento) => elemento.numero_diccionario === numeroDiccionario);
      const medicamentoNombre = medicamento ? medicamento.nombre : 'Nombre no encontrado';
      setSelectedDataObject({
        medicamento: medicamentoNombre,
        medicamento_value: medicamento,
        cantidad: selectedData.values[1],
        unidad: unidades[selectedData.values[2] - 1],
        frecuencia: selectedData.values[3],
        diasTratamiento: selectedData.values[4]
      });
      
      // Actualiza los estados basados en el estado anterior
      setMedicamento1(medicamento);
      setCantidad1(selectedData.values[1]);
      setUnidad1(unidades[selectedData.values[2] - 1]);
      setFrecuencia1(selectedData.values[3]);
      setDuracion1(selectedData.values[4]);
    }
    handleClose();
  };

  //fin Model presuntivo

  //Model Final
  const [openFinal, setOpenFinal] = useState(false);
  const [isPreFinal, setIsPreFinal] = useState(false);
  const [predictionDataFinal, setPredictionDataFinal] = useState([]);
  const [selectedValueFinal, setSelectedValueFinal] = useState(null); // Nuevo estado para el valor seleccionado
  const [selectedDataObjectFinal, setSelectedDataObjectFinal] = useState({}); // Valores en forma de objetos
  //const outputsValues = [1, 2, 3];
  const [disabledFinal, setDisabledFinal] = useState(true);
  

  const handleClickOpenFinal = () => {
    setOpenFinal(true);
  };

  const handleCloseFinal = () => {
    setOpenFinal(false);
  };

  const fetchPredictionsFinal = async () => {
    const predictions = [];
    for (const outputs of outputsValues) {
      const prediction = await medicalModelService(
        selectededEnfermedadFinal.numero_diccionario,
        outputs,
        [[calcularEdad(usuario_data.fecha_nacimento),
          usuario_data.genero === "masculino" ? 1 : 2,
          selectededEnfermedadFinal.numero_diccionario,
          Number(lesionPrimariaModel),
          Number(ubicacionModel)]]);

      predictions.push(prediction);
    }
    setPredictionDataFinal(predictions);
    setIsPreFinal(true);
    setDisabledFinal(false);
  };

  // Manejar cambios en el Select
  const handlePredicctionChangeFinal = (event) => {
    const selectedDataIndex = event.target.value; // Cambia a índice en lugar de objeto
    setSelectedValueFinal(selectedDataIndex);
  };

  const handleAgreeClickFinal = () => {
    if (selectedValueFinal !== null) {
      const selectedData = predictionDataFinal[selectedValueFinal]; // Accede al objeto seleccionado por índice
      console.log(selectedData);
      // Realiza cualquier otra acción que desees con los datos seleccionados
      const numeroDiccionario = selectedData.values[0];
      const medicamento = medicamentos.find((elemento) => elemento.numero_diccionario === numeroDiccionario);
      const medicamentoNombre = medicamento ? medicamento.nombre : 'Nombre no encontrado';
      setSelectedDataObjectFinal({
        medicamento: medicamentoNombre,
        medicamento_value: medicamento,
        cantidad: selectedData.values[1],
        unidad: unidades[selectedData.values[2] - 1],
        frecuencia: selectedData.values[3],
        diasTratamiento: selectedData.values[4]
      });
      
      // Actualiza los estados basados en el estado anterior
      setMedicamento2(medicamento);
      setCantidad2(selectedData.values[1]);
      setUnidad2(unidades[selectedData.values[2] - 1]);
      setFrecuencia2(selectedData.values[3]);
      setDuracion2(selectedData.values[4]);
    }
    handleClose();
  };

  //Fin Mole Final



    return(
        <div className="clinic-container">

                <div className="Consulta-cabecera">
                <h2>Consulta Médica</h2>
                {selectedUser && (
                  <>
                  <h3 className="name">{selectedUser.full_name}</h3>
                    
                  </>
               )}
                <div className="">
                    <label  htmlFor="motivo">Motivo de consulta:</label>
                    <input id="motivo" className="motivo" type="text" onChange={handleMotivoConsultaChange}/>
                    <button className="boton-cabecera" >ver mas información del paciente</button>
                </div>
                
                
                </div>
        
                <div className="examen-fisico-container">
                <h3>Examen Físico</h3>
                <h4>Piel, Faneras y Tejidos Celular Subcutáneo</h4>
                <div className="skin-container">
                    <h4>a. Piel:</h4>
                    <label htmlFor="skin-color">Color:</label>
                    <input required id="skin-color" className="skin-color" type="text"
                      name="piel.color" // Nombre del campo dentro del subdocumento "piel"
                      onChange={handleExamenFisicoChange}
                    />
                    <label htmlFor="turgencia">Turgencia:</label>
                    <input required id="turgencia" className="turgencia" type="text"
                        name="piel.turgencia" 
                        onChange={handleExamenFisicoChange}
                    />
                    <label >Lesiones:</label>

                    <div className="lesiones-container">
                      <Stack  spacing={3} sx={{ width: 500 }}>
                      <Autocomplete
                          id="tags-standard"
                          options={lesionesPri}
                          getOptionLabel={(option) => option}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="standard"
                              label="Lesiones Primarias"
                              placeholder="Ubicación"
                            />
                          )}
                          onChange={(event, value) => {
                            setLesionesSeleccionadasPri(value);
                            setlesionPrimariaModel(lesionesPri.indexOf(value) + 1);
                          }}
                        />

                        <Autocomplete
                          multiple
                          id="tags-standard2"
                          options={lesionesSecu.map(item => item)}
                          getOptionLabel={(option) => option}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="standard"
                              label="Lesiones Secundarias"
                              placeholder="Lesion"
                            />
                          )}
                          onChange={(event, value) => {
                            setLesionesSeleccionadasSecu(value);
                            setlesionSecundariaModel(lesionesSecu.indexOf(value) +  11)
                          }}
                        />

                        <Autocomplete
                          id="tags-standard3"
                          options={lesionUbi}
                          getOptionLabel={(option) => option}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="standard"
                              label="Ubicaciones de las lesiones"
                              placeholder="Ubicación"
                            />
                          )}
                          onChange={(event, value) => {
                            setUbicacionSeleccionada(value);
                            setUbicacionModel(lesionUbi.indexOf(value) + 1);
                          }}
                        />
                      </Stack>

                      

                    </div>
                    
                    
                </div>
                <div className="faneras-container">
                    <h4>b. Faneras:</h4>
                    <label htmlFor="pelo">Pelo:</label>
                    <input id="pelo" className="pelo" type="text"
                     name="faneras.pelo" 
                     required
                     onChange={handleExamenFisicoChange}
                    />
                    <label htmlFor="unhas">Uñas:</label>
                    <input id="unhas" className="unhas" type="text"
                      name="faneras.unhas" 
                      required
                      onChange={handleExamenFisicoChange}
                    />
                </div>
                <div className="tejidoCelularSc-container">
                    <h4>c. Tejidos:</h4>
                    <label htmlFor="tcs">Tejido celular subcutáneo:</label>
                    <input id="tcs" className="tcs" type="text"
                      name="tejidos.celu_subcutaneo" 
                      required
                      onChange={handleExamenFisicoChange}
                    />
                    
                </div>
        
                </div>
        
                <div className="diagnostico-container">
                <h3>Diagnostico:</h3>
                <div id="autocomplete-container">
                  <div className="diagnostico-presuntivo-container">
                    <label >Diagnostico Presuntivo</label>
                    <Autocomplete
                      disablePortal
                      id="combo-DiagnosticoPresuntivo"
                      options={enfermedades}
                      getOptionLabel={(option) => option.nombre}
                      sx={{ width: 300 }}
                      renderInput={(params) => <TextField {...params} label="Enfermedad" />}
                      onChange={handleDiagnosticoPresuntivoChange}
                    />
                </div>
        
                <div className="diagnostico-definitivo-container">
                    <label>Diagnostico Definitivo</label>
                    <Autocomplete
                      disablePortal
                      id="combo-diagnosticoDefinitivo"
                      options={enfermedades}
                      getOptionLabel={(option) => option.nombre}
                      sx={{ width: 300 }}
                      renderInput={(params) => <TextField {...params} label="Enfermedad" />}
                      onChange={handleDiagnosticoFinalChange}
                    />
                </div>
                </div>
                <div id="container-enfermedadComponent">
                  <EnfermedadComponent handleGuardar={handleGuardar}/>
                </div>
                </div>
        
                <h3>Seleccione tratamientos para las enfermedades</h3>
                <div className="tratamiento-container">


                <div id="accordion">
                <Accordion disabled={!enfermedadPreExist} sx={{width:350}} expanded={expandedAccordion1} onChange={handleAccordion1Change}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography sx={{ color: 'blue' }}>Enfermedad presuntiva</Typography>

                  </AccordionSummary>
                  <AccordionDetails  sx={{ height: 450 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <Autocomplete
                        disablePortal
                        id="combo-Medicamentos"
                        options={medicamentos}
                        getOptionLabel={(option) => option.nombre + ' ' + option.presentacion}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Medicamento" />}
                        value={medicamento1}
                        onChange={handleMedicamento1Change}
                        placeholder="Medicamento"
                        freeSolo={freesoloPresuntivo}
                      />
                      <div className="cantidad-container">
                        <TextField sx={{width: 120}}
                        label="Cantidad a usar" type="number" 
                        value={cantidad1}
                        onChange={handleCantidad1Change}
                        />
                        <div>
                          <FormControl sx={{ m: 1, minWidth: 100, height: 20 }}>
                            <InputLabel htmlFor="grouped-select1">Unidad</InputLabel>
                            <Select defaultValue="" id="grouped-select1" label="Unidad"
                            value={unidad1}
                            onChange={handleUnidad1Change}
                            >
                            <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              <ListSubheader>Peso en líquidos</ListSubheader>
                              <MenuItem value={"gota(gt)"}>gota(gt)</MenuItem>
                              <MenuItem value={"microgota(mgota)"}>microgota(mgota)</MenuItem>
                              <MenuItem value={"litro(L)"}>litro(L)</MenuItem>
                              <MenuItem value={"mililitro(mL)"}>mililitro(mL)</MenuItem>
                              <MenuItem value={"microlitro(µL)"}>microlitro(µL)</MenuItem>
                              <MenuItem value={"centímetro cúbico(cc/cm³)"}>centímetro cúbico(cc/cm³)</MenuItem>
                              <MenuItem value={"dracma líquida(dr)"}>dracma líquida(dr)</MenuItem>
                              <MenuItem value={"cucharadita(cdita)"}>cucharadita(cdita)</MenuItem>
                              <MenuItem value={"cucharada(cda)"}>cucharada(cda)</MenuItem>
                              <ListSubheader>Peso en sólidos</ListSubheader>
                              <MenuItem value={"gramo(g)"}>gramo(g)</MenuItem>
                              <MenuItem value={"miligramo(mg)"}>miligramo(mg)</MenuItem>
                              <MenuItem value={"microgramo(mcg/µg)"}>microgramo(mcg/µg)</MenuItem>
                              <ListSubheader>Sólidos</ListSubheader>
                              <MenuItem value={"Tabletas"}>Tabletas</MenuItem>
                              <MenuItem value={"Cápsulas"}>Cápsulas</MenuItem>
                              <MenuItem value={"Comprimidos"}>Comprimidos</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                       
                      </div>
                      <div className="container-inputs ">
                        <TextField 
                          label="Frecuencia Diaria" type="number" 
                          placeholder="Horas"
                          value={frecuencia1}
                          onChange={handleFrecuencia1Change}
                        />
                        <TextField 
                          label="Dias de tratamiento" type="number" 
                          placeholder="Dias"
                          value={duracion1}
                          onChange={handleDuracion1Change}
                        />
                        <div>
                          {
                            usuarioEsSeleccionado && 
                           (
                            <div>
                            <Button variant="outlined" onClick={handleClickOpen}> 
                              Machine Learning Prediction
                            </Button>
                            <Dialog
                              scroll="body"
                              open={open}
                              onClose={handleClose} 
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description"
                            >
                              <DialogTitle id="alert-dialog-title">
                                {"Predicción de la enfermedad x"}
                              </DialogTitle>
                              <DialogContent>
                                <Button variant="outlined" onClick={fetchPredictions}> 
                                  GENERAR
                                </Button>
                                <DialogContentText id="alert-dialog-description">
                                </DialogContentText>
                                <div id='form-prediction'>
                                  <FormControl sx={{ m: 1, width: 300, height: 20 }}>
                                    <InputLabel htmlFor="grouped-select">Predicciones</InputLabel>
                                    <Select disabled={disabled} 
                                      id="grouped-select" label="Predicciones"
                                      value={selectedValue} 
                                      onChange={handlePredicctionChange}
                                    >
                                      {isPre && medicamentos && // Asegurarse de que medicamentos esté disponible
                                        predictionData.map((prediction, index) => {
                                          const numeroDiccionario = prediction.values[0];
                                          const medicamento = medicamentos.find((elemento) => elemento.numero_diccionario === numeroDiccionario);
                                          const medicamentoNombre = medicamento ? medicamento.nombre : 'Nombre no encontrado';
                      
                                          return (
                                            <MenuItem key={index} value={index}> {/* Cambia el valor a índice */}
                                              {`${prediction.values[1]} ${unidades[prediction.values[2] - 1]} de ${medicamentoNombre} cada ${prediction.values[3]} hs por ${prediction.values[4]} días`}
                                            </MenuItem>
                                          );
                                        })
                                      }
                                    </Select>
                                  </FormControl>
                                </div>
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleClose}>Cerrar</Button>
                                <Button onClick={handleAgreeClick} autoFocus>
                                  Agregar
                                </Button>
                              </DialogActions>
                            </Dialog>
                          </div>
                           )
                            
                          }
                         
                          
                        </div>
                        <Button onClick={handleSubmitTratamientoPresuntivo}>Guardar</Button>
                      </div>
                      <div>
                        {tratLoading1 && 
                          <Box sx={{ display: 'flex' }}>
                          <CircularProgress />
                          </Box> 
                        }
                        {
                          tratError1 && 
                          <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert onClose={() => {setTratError1(false)}} severity="error">Error al guardar la tratamiento — Verifica los campos!</Alert>
                          </Stack>
                        
                        }
                        {
                          tratSucces1 && 
                          <>
                            <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert onClose={() => {setTratSucces1(false)}} severity="success">Tratamiento guardado con exito!!</Alert>
                            </Stack>
                          </>
                        }
                      </div>
                        
                    </div>
                  </AccordionDetails>
               </Accordion>

               <Accordion disabled={!enfermedadFinalExist} sx={{width:350}} expanded={expandedAccordion2} onChange={handleAccordion2Change}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography sx={{ color: 'blue' }}>Enfermedad Definitiva</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ height: 450 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <Autocomplete
                        disablePortal
                        id="combo-Medicamentos2"
                        options={medicamentos}
                        getOptionLabel={(option) => option.nombre + ' ' + option.presentacion}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Medicamento" />}
                        value={medicamento2}
                        placeholder="Medicamentos"
                        freeSolo={true}
                        onChange={handleMedicamento2Change}
                      />
                      <div className="cantidad-container">
                        <TextField sx={{width: 80}}
                        label="Cantidad a usar" type="number" 
                        value={cantidad2}
                        onChange={handleCantidad2Change}
                        />
                        <div>
                          <FormControl sx={{ m: 1, minWidth: 100, height: 20 }}>
                            <InputLabel htmlFor="grouped-select">Unidad</InputLabel>
                            <Select defaultValue="" 
                              id="grouped-select" label="Unidad"
                              value={unidad2}
                              onChange={handleUnidad2Change}
                            >
                            <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              <ListSubheader>Peso en líquidos</ListSubheader>
                              <MenuItem value={"gota(gt)"}>gota(gt)</MenuItem>
                              <MenuItem value={"microgota(mgota)"}>microgota(mgota)</MenuItem>
                              <MenuItem value={"litro(L)"}>litro(L)</MenuItem>
                              <MenuItem value={"mililitro(mL)"}>mililitro(mL)</MenuItem>
                              <MenuItem value={"microlitro(µL)"}>microlitro(µL)</MenuItem>
                              <MenuItem value={"centímetro cúbico(cc/cm³)"}>centímetro cúbico(cc/cm³)</MenuItem>
                              <MenuItem value={"dracma líquida(dr)"}>dracma líquida(dr)</MenuItem>
                              <MenuItem value={"cucharadita(cdita)"}>cucharadita(cdita)</MenuItem>
                              <MenuItem value={"cucharada(cda)"}>cucharada(cda)</MenuItem>
                              <ListSubheader>Peso en sólidos</ListSubheader>
                              <MenuItem value={"gramo(g)"}>gramo(g)</MenuItem>
                              <MenuItem value={"miligramo(mg)"}>miligramo(mg)</MenuItem>
                              <MenuItem value={"microgramo(mcg/µg)"}>microgramo(mcg/µg)</MenuItem>
                              <ListSubheader>Sólidos</ListSubheader>
                              <MenuItem value={"Tabletas"}>Tabletas</MenuItem>
                              <MenuItem value={"Cápsulas"}>Cápsulas</MenuItem>
                              <MenuItem value={"Comprimidos"}>Comprimidos</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                       
                      </div>
                      <div className="container-inputs ">
                        <TextField 
                        label="Frecuencia Diaria" type="number" 
                        placeholder="Horas"
                        value={frecuencia2}
                        onChange={handleFrecuencia2Change}
                        />
                        <TextField 
                        label="Dias de tratamiento" type="number" 
                        placeholder="Dias"
                        value={duracion2}
                        onChange={handleDuracion2Change}
                        />
                        {
                            usuarioEsSeleccionado && 
                           (
                            <div>
                            <Button variant="outlined" onClick={handleClickOpenFinal}> 
                              Machine Learning Prediction
                            </Button>
                            <Dialog
                              scroll="body"
                              open={openFinal}
                              onClose={handleCloseFinal} 
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description"
                            >
                              <DialogTitle id="alert-dialog-title">
                                {"Predicción de la enfermedad x"}
                              </DialogTitle>
                              <DialogContent>
                                <Button variant="outlined" onClick={fetchPredictionsFinal}> 
                                  GENERAR
                                </Button>
                                <DialogContentText id="alert-dialog-description">
                                </DialogContentText>
                                <div id='form-prediction'>
                                  <FormControl sx={{ m: 1, width: 300, height: 20 }}>
                                    <InputLabel htmlFor="grouped-select">Predicciones</InputLabel>
                                    <Select disabled={disabledFinal} 
                                      id="grouped-select" label="Predicciones"
                                      value={selectedValueFinal} 
                                      onChange={handlePredicctionChangeFinal}
                                    >
                                      {isPreFinal && medicamentos && // Asegurarse de que medicamentos esté disponible
                                        predictionDataFinal.map((prediction, index) => {
                                          const numeroDiccionario = prediction.values[0];
                                          const medicamento = medicamentos.find((elemento) => elemento.numero_diccionario === numeroDiccionario);
                                          const medicamentoNombre = medicamento ? medicamento.nombre : 'Nombre no encontrado';
                      
                                          return (
                                            <MenuItem key={index} value={index}> {/* Cambia el valor a índice */}
                                              {`${prediction.values[1]} ${unidades[prediction.values[2] - 1]} de ${medicamentoNombre} cada ${prediction.values[3]} hs por ${prediction.values[4]} días`}
                                            </MenuItem>
                                          );
                                        })
                                      }
                                    </Select>
                                  </FormControl>
                                </div>
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleCloseFinal}>Cerrar</Button>
                                <Button onClick={handleAgreeClickFinal} autoFocus>
                                  Agregar
                                </Button>
                              </DialogActions>
                            </Dialog>
                          </div>
                           )
                            
                          }
                        <Button onClick={handleSubmitTratamientoFinal}>Guardar</Button>
                      </div>
                      <div>
                        {tratLoading2 && 
                          <Box sx={{ display: 'flex' }}>
                          <CircularProgress />
                          </Box> 
                        }
                        {
                          tratError2 && 
                          <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert onClose={() => {setTratError2(false)}} severity="error">Error al guardar la tratamiento — Verifica los campos!</Alert>
                          </Stack>
                        
                        }
                        {
                          tratSucces2 && 
                          <>
                            <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert onClose={() => {setTratSucces2(false)}} severity="success">Tratamiento guardado con exito!!</Alert>
                            </Stack>
                          </>
                        }
                      </div>
                        
                    </div>
                  </AccordionDetails>
               </Accordion>
               </div>

                    
                  
                </div>


                  <button className="anhadir">Añadir tratamiento</button>
                <div className="opciones">
                    <button onClick={handleGuardarCon}>Guardar</button>
                    <button>Limpiar</button>
                    <button>Cancelar</button>
                </div>
             <div>
               {loading && 
                <Box sx={{ display: 'flex' }}>
                <CircularProgress />
                </Box> 
               }
               {
                errorCargando && 
                <Stack sx={{ width: '100%' }} spacing={2}>
                  <Alert onClose={() => {setError(false)}} severity="error">Error al guardar la consulta — Verifica los campos!</Alert>
                </Stack>
               
               }
               {
                succes && 
                <>
                  <Stack sx={{ width: '100%' }} spacing={2}>
                  <Alert onClose={() => {setSucces(false)}} severity="success">Consulta guardada con exito!!</Alert>
                  </Stack>
                </>
               }
             </div>
                
            </div> 
    )
        
    
}

export default MedicalConsultation;