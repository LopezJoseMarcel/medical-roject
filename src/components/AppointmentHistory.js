import React from 'react';
import { useState, useContext, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../styles/AppoitmentHistory.css';
import lastCita from '../services/lastCita';
import Context from '../context/UserContext'



export default function AppointmentHistory() {
//states 
const [citas, setCitas] = useState([])
//context
const {userInfo} = useContext(Context);

function createData(id,dia,fecha, turno,estado) {
  return { id,dia,fecha, turno,estado};
}

const rows = citas.map((cita,index) =>
  createData(index + 1,new Date(cita.fecha).toLocaleDateString("es-ES", { weekday: "long" }),cita.fecha.slice(0, cita.fecha.indexOf("T")), cita.turno, cita.disease)
);

//fetch cita
const fetchCitas = async () => {
  try {
    const citasData = await lastCita(userInfo._id); // Reemplaza "id" con el valor correcto
    setCitas(citasData);
  } catch (error) {
    console.error('Error al cargar las citas:', error.message);
  }
};

// Llama a la función fetchCitas en el useEffect para obtener las citas cuando el componente se monte
useEffect(() => {
  fetchCitas();
}, []);

return (
  <TableContainer className='table' component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>id</TableCell>
          <TableCell align="right">Dia</TableCell>
          <TableCell align="right">Fecha de cita</TableCell>
          <TableCell align="right">Horario</TableCell>
          <TableCell align="right">Estado</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.id}
            </TableCell>
            <TableCell align="right">{row.dia}</TableCell>
            <TableCell align="right">{row.fecha}</TableCell>
            <TableCell align="right">{row.turno}</TableCell>
            <TableCell align="right">{row.estado}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

}