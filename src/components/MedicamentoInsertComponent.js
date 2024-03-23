import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import Slide from '@mui/material/Slide';
//import InsertForm from './InsertForm';
import InsertFormMedicamento from './InsertFormMedicamento';


import allMediService from '../services/allMediService';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MedicamentoInsertComponent({ handleGuardar }) {
  const [open, setOpen] = React.useState(false);

 const [medicamentos, setMedicamentos] = React.useState([]);

  const fetchMedicInsert = async () => {
    try {
      const response = await allMediService();
      setMedicamentos(response);

      if (!response) {
        throw new Error('error en allEnferService')
      }

    } catch (error) {
      throw new Error(error.message);
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGuardarClick = () => {
    handleGuardar(); // Llama a la función handleGuardar de MedicalConsultation
    handleClose();
    fetchMedicInsert();
  };

  return (
    <div>
      <Button  variant="contained" onClick={handleClickOpen}>
        Agregar Nuevo medicamento
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseSharpIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Añadir Medicamento
            </Typography>
            <Button autoFocus color="inherit" onClick={handleGuardarClick}>
              guardar
            </Button>
          </Toolbar>
        </AppBar>


        <InsertFormMedicamento></InsertFormMedicamento>
      </Dialog>
    </div>
  );
}
