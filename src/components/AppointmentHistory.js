import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../styles/AppoitmentHistory.css'

function createData(id, date, schedule,disease) {
  return { id, date, schedule, disease};
}

const rows = [
  createData(1 ,'Lunes 03-04-2023', '16:30', 'Covid'),
  createData(2 ,'Viernes 31-03-2023', '18:30', 'Gastritis') 
];

export default function AppointmentHistory() {
  return (
    <TableContainer className='table' component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align="right">Fecha de la consulta</TableCell>
            <TableCell align="right">Horario</TableCell>
            <TableCell align="right">Diagnostico</TableCell>
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
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.schedule}</TableCell>
              <TableCell align="right">{row.disease}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}