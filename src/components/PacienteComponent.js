import '../styles/PacienteComponent.css';
import calcularEdad from '../utils/calcularEdad';
import React, { useEffect, useState } from 'react';
import allEnferService from '../services/allEnferService';
import allUser from '../services/allUser';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FullScreenDialogPatient from '../containers/FullScreenDialogPatient';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TablePagination,
  Autocomplete,
  Switch,
  FormGroup,
  Stack,
  Typography,
 
} from '@mui/material';

const PacienteComponent = () => {
  const [users, setUsers] = useState([]);
  const [usersForFilltred, setUsersForFilltred] = useState([]);
  const [userSelectedBuscar, setUserSelectedBuscar] = useState(null);

  const [diseases, setDiseases] = useState([]);
  const [selectedDisease, setSelectedDisease] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [operIgualDisabled, setOperIgualDisabled] = useState(false);
 
  const [checked, setChecked] = useState(false);

  //new state
  const [filtroCiudad, setFiltroCiudad] = useState('');
  const [filtroBarrio, setFiltroBarrio] = useState('');
  const [filtroCalle, setFiltroCalle] = useState('');
  const [filtroEdadMayor, setFiltroEdadMayor] = useState('');
  const [filtroEdadMenor, setFiltroEdadMenor] = useState('');
  const [filtroEdadIgual, setFiltroEdadIgual] = useState('');
  //const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  //end state

  //new handler
  const handleRowClick = (user) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedUser(null);
    setIsDialogOpen(false);
  };
    
  //end handler

  useEffect(() => {
    allUser()
      .then((data) => {
        setUsers(data);
        setUsersForFilltred(data);
      })
      .catch((error) => {
        console.error('Error al obtener usuarios:', error);
      });

    allEnferService()
      .then((data) => {
        setDiseases(data);
      })
      .catch((error) => {
        console.error('Error al obtener enfermedades:', error);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleAplicarFiltros = () => {
    let filteredUsers = usersForFilltred.slice(); // Clonar el arreglo original

    // Filtrar por ciudad
    if (filtroCiudad) {
      filteredUsers = filteredUsers.filter((user) =>
        user.direccion.ciudad.toLowerCase().includes(filtroCiudad.toLowerCase())
      );
    }

    // Filtrar por barrio
    if (filtroBarrio) {
      filteredUsers = filteredUsers.filter((user) =>
        user.direccion.barrio.toLowerCase().includes(filtroBarrio.toLowerCase())
      );
    }

    // Filtrar por calle
    if (filtroCalle) {
      filteredUsers = filteredUsers.filter((user) =>
        user.direccion.calle.toLowerCase().includes(filtroCalle.toLowerCase())
      );
    }

    // Filtrar por edad mayor
    if (filtroEdadMayor) {
      filteredUsers = filteredUsers.filter(
        (user) => calcularEdad(user.fecha_nacimento) > parseInt(filtroEdadMayor)
      );
    }

    // Filtrar por edad menor
    if (filtroEdadMenor) {
      filteredUsers = filteredUsers.filter(
        (user) => calcularEdad(user.fecha_nacimento) < parseInt(filtroEdadMenor)
      );
    }

    // Filtrar por edad igual
    if (filtroEdadIgual) {
      filteredUsers = filteredUsers.filter(
        (user) => calcularEdad(user.fecha_nacimento) === parseInt(filtroEdadIgual)
      );
    }

    // Filtrar por enfermedad seleccionada
    if (selectedDisease) {
      filteredUsers = filteredUsers.filter((user) =>
        user.enfermedad.includes(selectedDisease) || user.enfermedad_presuntiva.includes(selectedDisease)
      );
    }

    // Actualizar el estado de los usuarios filtrados
    setUsers(filteredUsers);
    setPage(0);

    // Si hay un usuario seleccionado, muestra solo ese usuario en la tabla
   /* if (usuarioSeleccionado) {
      setUsers([usuarioSeleccionado]);
    }*/
  };

  const handleBorrarFiltros = () => {
    // Restablecer los estados de los campos de filtro
    setFiltroCiudad('');
    setFiltroBarrio('');
    setFiltroCalle('');
    setFiltroEdadMayor('');
    setFiltroEdadMenor('');
    setFiltroEdadIgual('');
    setSelectedDisease(null);

    // Volver a cargar todos los usuarios sin filtros
    allUser()
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error('Error al obtener usuarios:', error);
      });

    // También puedes restablecer el usuario seleccionado si es necesario
    setUserSelectedBuscar(null);
  };

  return (
    <div id="general-container">
      <div id="filtros-container">
        <h4>Filtros</h4>
        <div className='direccion-container'>
          <h5>Dirección</h5>
          <TextField size='small' id="tf-ciudad" label="Ciudad" variant="outlined" value={filtroCiudad}
           onChange={(e) => setFiltroCiudad(e.target.value)} />
          <TextField size='small' id="tf-barrio" label="Barrio" variant="outlined"  value={filtroBarrio}
           onChange={(e) => setFiltroBarrio(e.target.value)}/>
          <TextField size='small' id="tf-calle" label="Calle" variant="outlined" value={filtroCalle}
           onChange={(e) => setFiltroCalle(e.target.value)}/>
        </div>
        <div className='edad-container'>
          <h5>Edad</h5>
          <TextField
            type='number'
            size='small'
            id="tf-mayor"
            label="Edad mayor que"
            variant="outlined"
            value={filtroEdadMayor}
            onChange={(e) => {
              setFiltroEdadMayor(e.target.value);
              setOperIgualDisabled(true);
            }}
          />
          <TextField
            type='number'
            size='small'
            id="tf-menor"
            label="Edad menor que"
            variant="outlined"
            value={filtroEdadMenor}
            onChange={(e) => {
              setFiltroEdadMenor(e.target.value);
              setOperIgualDisabled(true);
            }}
          />
          <TextField
            disabled={operIgualDisabled}
            type='number'
            size='small'
            id="tf-igual"
            label="Edad igual a"
            variant="outlined"
            value={filtroEdadIgual}
            onChange={(e) => {
              setFiltroEdadIgual(e.target.value);
            }}
          />
        </div>
        <div className="enfermedad-container">
          <h5>Enfermedad</h5>
          <Autocomplete
            size='small'
            disablePortal
            id="combo-DiagnosticoPresuntivo"
            options={diseases}
            getOptionLabel={(option) => option.nombre}
            renderInput={(params) => <TextField {...params} label="Enfermedad" />}
            onChange={(event, value) => {
              if (value) {
                setSelectedDisease(value._id);
              } else {
                setSelectedDisease(null); // Otra opción, si deseas restablecerlo a null cuando no hay un valor seleccionado
              }
            }}
          />
        </div>
        <div className='button-container'>
          <Button onClick={handleAplicarFiltros} variant="contained" >Aplicar</Button>
          <Button onClick={handleBorrarFiltros} variant="contained">Borrar</Button>
        </div>
      </div>
      <div id="panel-container">
        <div id="buscar-container">
          <h4>Buscar</h4>
          {
            checked && 
             <Autocomplete
              size='small'
              disablePortal
              id="combo-buscar-nombre"
              sx={{width: 300}}
              options={users}
              getOptionLabel={(option) => `${option.nombre} ${option.apellido}`}
              renderInput={(params) => <TextField {...params} label="Nombre y Apellido" />}
              onChange={(event, value) => {
                setUserSelectedBuscar(value);
              }}
            />
          }
          {
            !checked && 
            <Autocomplete
             size='small'
             disablePortal
             id="combo-buscar-nombre"
             sx={{width: 300}}
             options={users}
             getOptionLabel={(option) => option.cedula}
             renderInput={(params) => <TextField {...params} label="Número de Cedula" />}
             onChange={(event, value) => {
              setUserSelectedBuscar(value);
            }}
           />
          }
          <FormGroup>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography style={{ fontSize: '12px', color: 'grey' }}>Cedula</Typography>
              <Switch
                size='small'
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <Typography  style={{ fontSize: '12px', color: 'grey' }} >Nombre - Apellido</Typography>
            </Stack>
          </FormGroup>
        </div>
        <div id="pacientes-container">
          <div>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Apellido</TableCell>
                    <TableCell>Número de Cédula</TableCell>
                    <TableCell>Ciudad</TableCell>
                    <TableCell>Edad</TableCell>
                    <TableCell>Enfermedad</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userSelectedBuscar ? (
                    <TableRow style={{ cursor: 'pointer' }} onClick={() => handleRowClick(userSelectedBuscar)} key={userSelectedBuscar._id}>
                      <TableCell>{userSelectedBuscar.nombre}</TableCell>
                      <TableCell>{userSelectedBuscar.apellido}</TableCell>
                      <TableCell>{userSelectedBuscar.cedula}</TableCell>
                      <TableCell>{userSelectedBuscar.direccion.ciudad}</TableCell>
                      <TableCell>{calcularEdad(userSelectedBuscar.fecha_nacimento)}</TableCell>
                      <TableCell>
                        {getUserDisease(
                          userSelectedBuscar.enfermedad,
                          userSelectedBuscar.enfermedad_presuntiva,
                          diseases
                        )}
                      </TableCell>
                    </TableRow>
                  ) : (
                    users
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((user) => (
                        <TableRow  onClick={() => handleRowClick(user)}
                        style={{ cursor: 'pointer' }} key={user._id}>
                          <TableCell>{user.nombre}</TableCell>
                          <TableCell>{user.apellido}</TableCell>
                          <TableCell>{user.cedula}</TableCell>
                          <TableCell>{user.direccion.ciudad}</TableCell>
                          <TableCell>{calcularEdad(user.fecha_nacimento)}</TableCell>
                          <TableCell>
                            {getUserDisease(
                              user.enfermedad,
                              user.enfermedad_presuntiva,
                              diseases
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
      </div>
      {isDialogOpen && (
      <FullScreenDialogPatient
        user={selectedUser}
        open={isDialogOpen}
        onClose={handleCloseDialog}
      />
    )}
    </div>
    
  );
};

// La función getUserDisease se mantiene igual
export default PacienteComponent;

function getUserDisease(enfermedad, enfermedadPresuntiva, diseases) {
  // Combinar las listas de enfermedades y enfermedades presuntivas
  const userEnfermedades = [...enfermedad, ...enfermedadPresuntiva];

  // Buscar el nombre de la enfermedad correspondiente
  const enfermedadNames = userEnfermedades.map((enfermedadId) => {
    const enfermedadObj = diseases.find((disease) => disease._id === enfermedadId);
    return enfermedadObj ? enfermedadObj.nombre : null;
  });

  // Filtrar los nombres de enfermedades que no sean nulos
  const filteredEnfermedades = enfermedadNames.filter((name) => name);

  if (filteredEnfermedades.length > 0) {
    // Si se encontraron enfermedades, unirlas en una cadena separada por comas
    return filteredEnfermedades.join(', ');
  } else {
    // Si no se encontraron enfermedades, devolver "Vacío"
    return "Vacío";
  }
}




