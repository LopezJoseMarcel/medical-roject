import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import Slide from '@mui/material/Slide';
import InsertForm from './InsertForm';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EnfermedadComponent({ handleGuardar }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGuardarClick = () => {
    handleGuardar(); // Llama a la función handleGuardar de MedicalConsultation
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Agregar Enfermedad
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
              Añadir Enfermedad
            </Typography>
            <Button autoFocus color="inherit" onClick={handleGuardarClick}>
              guardar
            </Button>
          </Toolbar>
        </AppBar>

        <InsertForm></InsertForm>
      </Dialog>
    </div>
  );
}
