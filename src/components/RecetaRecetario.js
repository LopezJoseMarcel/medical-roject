import React, {useState}from 'react';
import { Button } from '@mui/material';//
import '../styles/RecetaRecetario.css';
import Dialog from '@mui/material/Dialog';//
import AppBar from '@mui/material/AppBar';//
import Toolbar from '@mui/material/Toolbar';//
import IconButton from '@mui/material/IconButton';//
import CloseIcon from '@mui/icons-material/Close';//
import Slide from '@mui/material/Slide';
import logo from '../assets/logoDR.svg';
import { addDays, format, set } from "date-fns";
const fechaActual = new Date();

const TransitionRe = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RecetaRecetario = ({medicamentosArray}) => {
    const [openRecetario, setOpenRecetario] = useState(false);

    const handleClickOpenRecetario = () => {
        setOpenRecetario(true);
      };

    const handleCloseRecetario = () => {
        setOpenRecetario(false);
      };

   

  return (  
    <>
    <Button size='small' variant="outlined" onClick={handleClickOpenRecetario}>
       imprimir
      </Button>
      <Dialog
        fullScreen
        open={openRecetario}
        onClose={handleCloseRecetario}
        TransitionComponent={TransitionRe}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar >
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseRecetario}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            
          </Toolbar>
        </AppBar>
          <div id="main-container">
            <div className="receta">  
                <div className="cabacera">
                <img className="logoDR" src={logo}/>
                <h1 className="titulo">Recetario</h1>
                </div>
                <div className="info">
                  {
                    medicamentosArray.length > 0 ? (
                      medicamentosArray.map((med) =>{
                        return(
                          <p className='parrafo' key={med._id}>
                         {`
                          ${med.administracion}
                          ${med.nombre}
                          ${med.cantidad}
                          ${med.frecuencia} horas  
                         por ${med.duracion} días`}      
                         </p>   
                        )
                         
                      }
                      
                      ) 
                    ):
                    (
                      <h2>No data</h2>
                    )
                  }  
                  <div>
                  <label id='fecha1' >{format(fechaActual,'dd-MM-yyyy')}</label>
                  </div>
                </div>
               </div>
                <div className="receta">  
                <div className="cabacera">
                    <img className="logoDR" src={logo}/>
                    <h1 className="titulo">Receta</h1>
                </div>
                <div className="info">
                  {
                    medicamentosArray.length > 0 ? (
                      medicamentosArray.map((med) =>{
                        return(
                          <p className='parrafo' key={med._id}>
                         {`${med.nombre} `}      
                         </p>   
                        )
                         
                      }
                      ) 
                    ):
                    (
                      <h2>No data</h2>
                    )
                  }                
                </div>
                <div>
                <label id='fecha2' >{format(fechaActual,'dd-MM-yyyy')}</label>  
                </div>
            </div>
                <Button sx={{width: 95}} size='small' variant='outlined' onClick={() => window.print()}>Imprimir</Button>
            </div>
            
      </Dialog>
    </>
    
     
    );
};

export default RecetaRecetario;
