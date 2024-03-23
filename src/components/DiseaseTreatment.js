import React, { useEffect, useState, useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../styles/DiseaseTreatment.css';
import tratamientoEnfermedadService from '../services/tratamientoEnfermedadService';
import updateUserTratamiento from '../services/updateUserTratamiento';
import actualizarUserService from '../services/updateUserService'
import updateUserEnfermedad from '../services/updateUserEnfermedad';
import getUsuarioService from '../services/getUsuarioService';
import updateTratamientoValoracion from '../services/updateTratamientoValoracion';
//dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import  Button  from '@mui/material/Button';
//endDialog

//Rating
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
//end Rating

import Context from '../context/UserContext';


const fechaActual = new Date();

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};


export default function DiseaseTreatment() {
  
  const [tratamientos, setTratamientos] = useState([]);
  const [showTratamientoDialog, setShowTratamientoDialog] = useState(false);
  const { userInfo, setUserInfo  } = useContext(Context);


 

// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchTratamientos = async () => {
      
      try {
        // Obtener tratamientos desde el servicio
        if (userInfo.tratamiento.length > 0) {
          const promises = userInfo.tratamiento.map((id) => tratamientoEnfermedadService(id));
          const data = await Promise.all(promises);
          
          setTratamientos(data);
          const bandera = data.every(subArray => {
            // Verifica si subArray tiene al menos un elemento y ese elemento tiene la propiedad tratamiento_tiempo
            if (subArray.length > 0 && subArray[0].hasOwnProperty('tratamiento_tiempo')) {
              // Accede a tratamiento_tiempo y compara las fechas
              const tratamiento_tiempo = subArray[0].tratamiento_tiempo;
              return fechaActual > new Date(tratamiento_tiempo.fecha_fin);
            }
            return false; // Si subArray está vacío o no tiene tratamiento_tiempo, devuelve false
          });

          if (bandera) {
            setShowTratamientoDialog(true);
          }else{
            setShowTratamientoDialog(false);
          }
          
        } else {
          setShowTratamientoDialog(false);
        }
       
      } catch (error) {
        console.log(error);
      }
    };
    fetchTratamientos();
  }, []);

  

  const [ratingValue, setRatingValue] = React.useState(2); // Estado para mantener el valor seleccionado

  const handleRatingChange = (event, newValue) => {
    setRatingValue(newValue);
  };
  
  const handleClose = async () => {
    try {
        let enfermedad ={};
          
        const response2 = userInfo.tratamiento.map( element => {
          updateTratamientoValoracion(element, {
            "valoracion": Number(ratingValue),
          })
          .then(data => {
            console.log(data);
            console.log('Valoracion de tratamiento editado')
          }).catch(err => {
            console.error(err);
          })
        })

        const actualizarUsuario = await actualizarUserService(userInfo._id,
      {
        tratamiento: [],
        enfermedad: [],
        enfermedad_presuntiva: [],
      }).then(data => {
          
          const updateTratamiento =  updateUserTratamiento (userInfo._id, 
            {
              "nuevosElementos": userInfo.tratamiento,
            }
        ).then(data => {
           
            if (userInfo.enfermedad.length > 0) {
               enfermedad = { 
                "nuevosElementos": userInfo.enfermedad,
              }
            } else if(userInfo.enfermedad_presuntiva > 0) {
               enfermedad = { 
                "nuevosElementos": userInfo.enfermedad_presuntiva,
              }
            }else {
              enfermedad = {
                "nuevosElementos": [],
              } 
            }

            const updateEnfermedad =  updateUserEnfermedad(userInfo._id, enfermedad)
            .then((data) => {
              const updatedUserInfo =  getUsuarioService(userInfo._id)
              .then((data) => {
                
                setUserInfo(data);
                
                setShowTratamientoDialog(false);
                
                setTratamientos([]);
              });
              
              
            })
        })

         

      }).catch(err => console.log(err));

    } catch (error) {
      console.log(error);
    }
  
  };


  return (
    <div id='full-container'>
      <h3 className='table-title'>Tratamiento Activo</h3>
      <TableContainer className='table' component={Paper}>
        <Table sx={{ minWidth: 600}} aria-label="simple table" size='small'>
          <TableHead>
            <TableRow>
              
              <TableCell id='table-rows'  align="left">Forma de aplicación</TableCell>
              <TableCell id='table-rows' align="left">Medicamento</TableCell>
              <TableCell id='table-rows' align="left">Presentación&nbsp;(g)</TableCell>
              <TableCell id='table-rows' align="left">Cantidad &nbsp;(n)</TableCell>
              <TableCell id='table-rows' align="left">Frecuencia diaria&nbsp;(hs)</TableCell>
              <TableCell id='table-rows' align="left">Tiempo de tratamiento&nbsp;(días)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tratamientos.map((tratamiento) =>
              tratamiento.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  
                  <TableCell id='table-rows' align="left">{row.medicamento_info[0].administracion[0]}</TableCell>
                  <TableCell id='table-rows' align="left">{row.medicamento_info[0].nombre}</TableCell>
                  <TableCell id='table-rows' align="left">{row.medicamento_info[0].presentacion}</TableCell>
                  <TableCell id='table-rows' align="left">{row.cantidad_uso.cantidad}</TableCell>
                  <TableCell id='table-rows' align="left">{row.frecuencia_diaria_hr}</TableCell>
                  <TableCell id='table-rows' align="left">{`${row.tratamiento_tiempo.fecha_inicio} - ${row.tratamiento_tiempo.fecha_fin}`}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div id='dialog-container'>
        <Dialog
          open={showTratamientoDialog}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Su tratamiento a concluido!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Por favor valore como se siente al concluir el tratamiento
            </DialogContentText>
            <StyledRating
              name="highlight-selected-only"
              value={ratingValue}
              IconContainerComponent={IconContainer}
              getLabelText={(value) => customIcons[value].label}
              highlightSelectedOnly
              onChange={handleRatingChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>         
      </div>
    </div>
  );
}
